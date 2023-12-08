import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from 'src/app/Interfaces/Product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private endPoint: string =  "http://localhost:8080/api/v3/products"

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]>{
    console.log(this.http.get<Product[]>(this.endPoint));
    return this.http.get<Product[]>(this.endPoint);
  }

}
