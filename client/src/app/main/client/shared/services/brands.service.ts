import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBrand } from '../contracts/models';
import { IResponse } from 'src/app/app.common';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {
  private apiUrl = 'https://localhost:7071/api/brands';

  constructor(private http: HttpClient) {}

  getBrands(): Observable<IResponse<IBrand>> {
    return this.http.get<IResponse<IBrand>>(`${this.apiUrl}`);
  }

  getBrandDetails(uid: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${uid}`);
  }
}