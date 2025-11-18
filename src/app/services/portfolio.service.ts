import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  mainImage: string;
  description: string;
  gallery: string[];
}

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  constructor(private http: HttpClient) {}

  getPortfolioItems(): Observable<PortfolioItem[]> {
    return this.http.get<PortfolioItem[]>('data/portfolio.json');
  }

  getPortfolioItem(id: string): Observable<PortfolioItem[]> {
    return this.getPortfolioItems();
  }
}