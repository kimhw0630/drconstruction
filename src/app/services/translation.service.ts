import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

export interface TranslationData {
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private currentLanguage = new BehaviorSubject<string>('en');
  private translations: { [lang: string]: TranslationData } = {};
  private fallbackLanguage = 'en';

  currentLanguage$ = this.currentLanguage.asObservable();

  constructor(private http: HttpClient) {
    // Load saved language from localStorage or default to English
    const savedLang = localStorage.getItem('selectedLanguage') || 'en';
    // Load initial translations
    this.loadTranslations(savedLang).subscribe(() => {
      this.currentLanguage.next(savedLang);
    });
  }

  setLanguage(lang: string): void {
    this.loadTranslations(lang).subscribe(() => {
      this.currentLanguage.next(lang);
      localStorage.setItem('selectedLanguage', lang);
    });
  }

  getCurrentLanguage(): string {
    return this.currentLanguage.value;
  }

  private loadTranslations(lang: string): Observable<TranslationData> {
    if (this.translations[lang]) {
      return of(this.translations[lang]);
    }

    return this.http.get<TranslationData>(`i18n/${lang}.json`).pipe(
      map(translations => {
        this.translations[lang] = translations;
        return translations;
      }),
      catchError(() => {
        console.warn(`Failed to load translations for language: ${lang}`);
        // If it's not the fallback language, try to load fallback
        if (lang !== this.fallbackLanguage) {
          return this.loadTranslations(this.fallbackLanguage);
        }
        return of({});
      })
    );
  }

  translate(key: string, params?: { [key: string]: string }): string {
    const lang = this.getCurrentLanguage();
    
    // Check if translations are loaded for current language
    if (!this.translations[lang]) {
      console.warn(`Translations not loaded for language: ${lang}, loading key: ${key}`);
      // Try to load translations if not already loaded
      this.loadTranslations(lang).subscribe();
      return key; // Return key as placeholder until loaded
    }
    
    let translation = this.getNestedTranslation(this.translations[lang], key);
    
    // Fallback to English if translation not found
    if (!translation && lang !== this.fallbackLanguage && this.translations[this.fallbackLanguage]) {
      translation = this.getNestedTranslation(this.translations[this.fallbackLanguage], key);
    }
    
    // If still no translation found, return the key
    if (!translation) {
      console.warn(`Translation not found for key: ${key}`);
      return key;
    }

    // Replace parameters if provided
    if (params) {
      Object.keys(params).forEach(param => {
        translation = translation.replace(new RegExp(`{{${param}}}`, 'g'), params[param]);
      });
    }

    return translation;
  }

  private getNestedTranslation(obj: any, key: string): string {
    const keys = key.split('.');
    let result = obj;
    
    for (const k of keys) {
      if (result && typeof result === 'object' && k in result) {
        result = result[k];
      } else {
        return '';
      }
    }
    
    return typeof result === 'string' ? result : '';
  }

  // Observable method for reactive translations
  getTranslation$(key: string, params?: { [key: string]: string }): Observable<string> {
    return this.currentLanguage$.pipe(
      map(() => this.translate(key, params))
    );
  }
}