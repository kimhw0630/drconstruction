import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  mainImage: string;
  description: string;
  gallery: string[];
}

@Component({
  selector: 'app-portfolio-detail',
  standalone: false,
  templateUrl: './portfolio-detail.component.html',
  styleUrl: './portfolio-detail.component.scss'
})
export class PortfolioDetailComponent implements OnInit {
  portfolioItem: PortfolioItem | null = null;
  placeholderImages: any[] = [];

  // Portfolio data - in a real app, this would come from a service
  private portfolioData: PortfolioItem[] = [
    {
      id: 'kitchen-remodel',
      title: 'Modern Kitchen Remodel',
      category: 'Residential',
      mainImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBbeeTqcxyCdH9u6uz_3u1lxtF-SN21bgpWn8xBY6_Ianvxc3_pCrfHvYBz3d8jGZ_VqFPAjs95cdWqSm-Vb9aZWu3IZrNN6aFYxYJ0lwDZ3_leeyNsp8JdlVsK_dNFrFCxP8cQPIAPTQOYfchmFvMsUw9yAu66kTjRRUFH1jQzmU15Gr3NCIdKb_dySbI7HRngh-pxJJRP2mOvtIxYjL1BHmnwl848OxdVWfKgckw-wqemqTfOyf2gumd9UABYAG70E8CTeksL-DOX',
      description: 'A complete kitchen transformation featuring custom dark wood cabinetry, premium quartz countertops, and high-end stainless steel appliances. This modern design maximizes both functionality and style.',
      gallery: []
    },
    {
      id: 'living-room-update',
      title: 'Living Room Update',
      category: 'Family Home',
      mainImage: 'images/portfolio/livingroom.webp',
      description: 'A bright and airy living room renovation with sophisticated neutral color palette, modern furniture, and carefully curated art pieces that create a perfect balance of comfort and elegance.',
      gallery: []
    },
    {
      id: 'office-redesign',
      title: 'Office Space Redesign',
      category: 'Commercial',
      mainImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCmLprABA-2kSjsMf25x0x3G7G4mjpjjgIMlj8nxOaRiDTUK8WZMolc8GE-Q6KCHDdofzxasmyM5K0l9zz9tsXjFrhcbGAPHAAxdKQUgHgzjuHNGMUmDhMD8XdNfpxOXq7I1kKM1PwZsWIVcXjkhb9z-fyJDNfudDwXz1CzBeQms3yJznTB7_VdhVZtfs7BC6PrS0bmOdVd5OgiAtOLhBevT_DS4BTwmBAZN0-xA6c0DxpERhsNquetRP3hWMr5e3NqhHwPbtO-wg4F',
      description: 'A high-tech collaborative office space designed for maximum productivity, featuring ergonomic workstations, modern art installations, and strategic natural lighting to create an inspiring work environment.',
      gallery: []
    },
    {
      id: 'basement-renovation',
      title: 'Basement Renovation',
      category: 'Family Home',
      mainImage: 'images/portfolio/basement.webp',
      description: 'Transform your basement into the ultimate entertainment space with a cozy home theater system, comfortable seating, and ambient lighting perfect for family movie nights.',
      gallery: []
    },
    {
      id: 'screen-golf-setup',
      title: 'Screen Golf Setup',
      category: 'Commercial',
      mainImage: 'images/portfolio/screengolf.webp',
      description: 'A state-of-the-art indoor screen golf facility featuring high-tech simulation systems, premium equipment, and professional-grade setup for the ultimate golfing experience.',
      gallery: []
    },
    {
      id: 'restaurant-renovation',
      title: 'Restaurant Renovation',
      category: 'Commercial',
      mainImage: 'images/portfolio/restaurant.webp',
      description: 'A complete restaurant transformation with stylish modern interior design, ambient lighting systems, and chic decor that creates the perfect dining atmosphere for guests.',
      gallery: []
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    // Scroll to top when portfolio detail page loads
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.portfolioItem = this.portfolioData.find(item => item.id === id) || null;
      this.generatePlaceholders();
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
    }
  }

  private generatePlaceholders(): void {
    // Generate placeholder images to fill up to 10 total images
    const currentImages = this.portfolioItem?.gallery?.length || 0;
    const totalSlots = 10;
    const placeholdersNeeded = Math.max(0, totalSlots - currentImages);
    this.placeholderImages = new Array(placeholdersNeeded).fill(null);
  }
}
