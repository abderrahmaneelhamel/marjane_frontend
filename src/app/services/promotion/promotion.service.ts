import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Promotion } from '../../Interfaces/Promotion';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  private apiUrl: string = "https://20b0-197-230-250-154.ngrok.io/api/v3/promotions";

  constructor(private http: HttpClient) {}

  getPromotions(): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(this.apiUrl);
  }

  deletePromotion(id: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }

  createPromotion(promotion: Promotion): Observable<Promotion> {
    return this.http.post<Promotion>(this.apiUrl, promotion);
  }

  updatePromotion(promotion: Promotion): Observable<Promotion> {
    const url = `${this.apiUrl}/${promotion.id}`;
    return this.http.put<Promotion>(url, promotion);
  }
}
