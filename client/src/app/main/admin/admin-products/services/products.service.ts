import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct, IProductRequest } from '../../shared/contracts/models';
import { IResponse } from 'src/app/app.common';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = 'https://localhost:7071/api/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<IResponse<IProduct>> {
    return this.http.get<IResponse<IProduct>>(`${this.apiUrl}`);
  }

  getProductDetails(uid: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${uid}`);
  }

  createProduct(request: IProductRequest): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/create`, request);
  }

  editProduct(uid: string, request: IProductRequest): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${uid}/edit`, request);
  }

  deleteProduct(uid: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${uid}/delete`);
  }
}