import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from 'src/app/Interfaces/Category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private endPoint: string = "http://localhost:8080/api/v3/categories"

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]>{
    console.log(this.http.get<Category[]>(this.endPoint));
    return this.http.get<Category[]>(this.endPoint);
  }
}
