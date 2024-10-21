import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IShoppingCart } from '../contracts/models';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private apiUrl = 'https://localhost:7071/api/shopping-cart';

  constructor(private http: HttpClient) {}

  getShoppingCartDetails(): Observable<IShoppingCart> {
    return this.http.get<IShoppingCart>(`${this.apiUrl}`);
  }

  createShoppingCart(): Observable<IShoppingCart> {
    return this.http.post<IShoppingCart>(`${this.apiUrl}/create`, null);
  }
}
