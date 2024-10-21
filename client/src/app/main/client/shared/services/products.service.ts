import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../contracts/models';
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

  getProductDetails(uid: string): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.apiUrl}/${uid}`);
  }
}