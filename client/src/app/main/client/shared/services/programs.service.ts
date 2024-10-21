import { Injectable } from '@angular/core';
import { IProgram, IProgramRequest } from '../contracts/models';
import { IResponse } from 'src/app/app.common';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProgramsService {
  private apiUrl = 'https://localhost:7071/api/programs';

  constructor(private http: HttpClient) {}

  getPrograms(): Observable<IResponse<IProgram>> {
    return this.http.get<IResponse<IProgram>>(`${this.apiUrl}`);
  }

  updateLikesAndDislikes(uid: string, request: IProgramRequest): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${uid}/update`, request);
  }
}
