import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PortfolioService, PortfolioItem } from '../../services/portfolio.service';

@Component({
  selector: 'app-portfolio',
  standalone: false,
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss'
})
export class PortfolioComponent implements OnInit {
  portfolioItems: PortfolioItem[] = [];

  constructor(
    private router: Router,
    private portfolioService: PortfolioService
  ) {}

  ngOnInit(): void {
    this.portfolioService.getPortfolioItems().subscribe({
      next: (items) => {
        this.portfolioItems = items;
      },
      error: (error) => {
        console.error('Error loading portfolio items:', error);
      }
    });
  }

  navigateToPortfolio(portfolioId: string): void {
    this.router.navigate(['/portfolio', portfolioId]);
  }
}
