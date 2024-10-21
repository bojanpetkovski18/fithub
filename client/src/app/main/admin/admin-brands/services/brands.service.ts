import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBrand, IBrandRequest } from '../../shared/contracts/models';
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

  createBrand(request: IBrandRequest): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/create`, request);
  }

  editBrand(uid: string, request: IBrandRequest): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${uid}/edit`, request);
  }

  deleteBrand(uid: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${uid}/delete`);
  }
}