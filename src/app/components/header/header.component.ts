import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  currentLanguage$;
  isMobileMenuOpen = false;
  isLanguageDropdownOpen = false;
  
  languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' }
  ];

  constructor(
    private router: Router,
    private translationService: TranslationService
  ) {
    this.currentLanguage$ = this.translationService.currentLanguage$;
  }

  scrollToSection(sectionId: string): void {
    this.router.navigate(['/home'], { fragment: sectionId }).then(() => {
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    });
  }

  navigateToContact(): void {
    this.router.navigate(['/home'], { fragment: 'contact' }).then(() => {
      setTimeout(() => {
        const element = document.getElementById('contact');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    });
  }

  changeLanguage(langCode: string): void {
    this.translationService.setLanguage(langCode);
    this.closeLanguageDropdown();
  }

  getCurrentLanguage(): string {
    return this.translationService.getCurrentLanguage();
  }

  toggleLanguageDropdown(): void {
    this.isLanguageDropdownOpen = !this.isLanguageDropdownOpen;
  }

  closeLanguageDropdown(): void {
    this.isLanguageDropdownOpen = false;
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }
}
