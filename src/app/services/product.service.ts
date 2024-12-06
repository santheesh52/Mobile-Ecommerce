import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/todos/1'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  getProducts(): Promise<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products`)
      .toPromise()
      .then(products => products || []); // Return an empty array if products is undefined
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`);
  }
}
