import { Injectable } from '@angular/core';
import { IProgram, IProgramRequest, IShoppingCart } from '../contracts/models';
import { IResponse } from 'src/app/app.common';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private apiUrl = 'https://localhost:7071/api/shopping-cart';

  constructor(private http: HttpClient) {}

  getCartItems(shoppingCartUid: string): Observable<IShoppingCart> {
    return this.http.get<IShoppingCart>(`${this.apiUrl}/${shoppingCartUid}`);
  }

  addProductToCart(shoppingCartUid: string, productUid: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${shoppingCartUid}/add-product/${productUid}`, null);
  }

  removeProductFromCart(shoppingCartUid: string, productUid: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${shoppingCartUid}/remove-product/${productUid}`, null);
  }

  clearCartItems(shoppingCartUid: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${shoppingCartUid}/clear-products`, null);
  }
}