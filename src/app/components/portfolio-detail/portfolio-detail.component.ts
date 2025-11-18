import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { PortfolioService, PortfolioItem } from '../../services/portfolio.service';

@Component({
  selector: 'app-portfolio-detail',
  standalone: false,
  templateUrl: './portfolio-detail.component.html',
  styleUrl: './portfolio-detail.component.scss'
})
export class PortfolioDetailComponent implements OnInit {
  portfolioItem: PortfolioItem | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private portfolioService: PortfolioService
  ) {}

  ngOnInit(): void {
    // Scroll to top when portfolio detail page loads
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.portfolioService.getPortfolioItems().subscribe({
        next: (items: PortfolioItem[]) => {
          this.portfolioItem = items.find(item => item.id === id) || null;
        },
        error: (error: any) => {
          console.error('Error loading portfolio item:', error);
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/home'], { fragment: 'portfolio' }).then(() => {
      setTimeout(() => {
        const element = document.getElementById('portfolio');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    });
  }

  selectImage(image: string): void {
    // Update main image when gallery image is clicked
    if (this.portfolioItem) {
      this.portfolioItem.mainImage = image;
      
      // Scroll to main image with smooth animation
      setTimeout(() => {
        const mainImageElement = document.getElementById('main-image');
        if (mainImageElement) {
          mainImageElement.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
          });
        }
      }, 100);
    }
  }


}
