import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPayment, IProduct } from '../../shared/contracts/models';
import { IResponse } from 'src/app/app.common';

@Injectable({
  providedIn: 'root',
})
export class PaymentsService {
  private apiUrl = 'https://localhost:7071/api/payments';

  constructor(private http: HttpClient) {}

  getPayments(): Observable<IResponse<IPayment>> {
    return this.http.get<IResponse<IPayment>>(`${this.apiUrl}`);
  }

  getProductsFromPayment(uid: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${uid}/products`);
  }
}
