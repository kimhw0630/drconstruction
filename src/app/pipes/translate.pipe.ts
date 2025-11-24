import { Pipe, PipeTransform, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { TranslationService } from '../services/translation.service';
import { Subscription } from 'rxjs';

@Pipe({
  name: 'translate',
  pure: false,
  standalone: false
})
export class TranslatePipe implements PipeTransform, OnDestroy {
  private subscription?: Subscription;
  private lastKey = '';
  private lastValue = '';
  private lastLang = '';

  constructor(
    private translationService: TranslationService,
    private cdr: ChangeDetectorRef
  ) {}

  transform(key: string, params?: { [key: string]: string }): string {
    if (!key) return '';
    
    const currentLang = this.translationService.getCurrentLanguage();
    
    // Only recalculate if key or language changed
    if (key === this.lastKey && currentLang === this.lastLang) {
      return this.lastValue;
    }
    
    // Get translation
    const translation = this.translationService.translate(key, params);
    
    // Subscribe to language changes if not already subscribed
    if (!this.subscription) {
      this.subscription = this.translationService.currentLanguage$.subscribe(() => {
        // Reset cache when language changes
        this.lastKey = '';
        this.lastValue = '';
        this.lastLang = '';
        this.cdr.markForCheck();
      });
    }
    
    // If translation is still a key (not loaded), ensure translations will load
    if (translation === key && !this.translationService.isLanguageLoaded(currentLang)) {
      // Trigger loading and change detection once loaded
      this.translationService.ensureTranslationsLoaded().subscribe(() => {
        this.cdr.markForCheck();
      });
    }
    
    // Cache the result
    this.lastKey = key;
    this.lastValue = translation;
    this.lastLang = currentLang;
    
    return translation;
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}