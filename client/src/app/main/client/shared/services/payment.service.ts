import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPayment } from '../contracts/models';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = 'https://localhost:7071/api/payments';

  constructor(private http: HttpClient) {}

  createPayment(shoppingCartUid: string, request: IPayment): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create/${shoppingCartUid}`, request);
  }

  addProductsToPayment(paymentUid: string, productUid: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${paymentUid}/add-product/${productUid}`, null);
  }
}