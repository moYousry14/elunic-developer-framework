import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Product } from '../models/product.model';
import { DataResponse } from '@elunic-workspace/api-interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);
  private apiUrl = '/api/products';

  getProducts(): Observable<Product[]> {
    return this.http.get<DataResponse<Product[]>>(this.apiUrl).pipe(
      map(response => response.data)
    );
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<DataResponse<Product>>(this.apiUrl, product).pipe(
      map(response => response.data)
    );
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<DataResponse<{ deleted: boolean }>>(`${this.apiUrl}/${id}`).pipe(
      map(() => undefined)
    );
  }
}
