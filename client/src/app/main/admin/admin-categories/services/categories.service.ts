import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICategory, ICategoryRequest } from '../../shared/contracts/models';
import { IResponse } from 'src/app/app.common';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private apiUrl = 'https://localhost:7071/api/categories';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<IResponse<ICategory>> {
    return this.http.get<IResponse<ICategory>>(`${this.apiUrl}`);
  }

  getCategoryDetails(uid: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${uid}`);
  }

  createCategory(request: ICategoryRequest): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/create`, request);
  }

  editCategory(uid: string, request: ICategoryRequest): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${uid}/edit`, request);
  }

  deleteCategory(uid: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${uid}/delete`);
  }
}
