import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-portfolio',
  standalone: false,
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss'
})
export class PortfolioComponent {

  constructor(private router: Router) {}

  navigateToPortfolio(portfolioId: string): void {
    this.router.navigate(['/portfolio', portfolioId]);
  }
}
