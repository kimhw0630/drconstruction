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

  constructor(private translationService: TranslationService) {}

  transform(key: string, params?: { [key: string]: string }): string {
    if (!key) return '';
    
    // Always get fresh translation
    const translation = this.translationService.translate(key, params);
    
    // If translation is the same as key, it means not loaded yet, try again
    if (translation === key && !this.subscription) {
      this.subscription = this.translationService.currentLanguage$.subscribe(() => {
        // Trigger change detection when language loads
      });
    }
    
    return translation;
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}