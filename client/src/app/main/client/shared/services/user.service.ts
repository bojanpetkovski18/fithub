import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ILoginUser, IRegisterUser, IUserInfo, Role } from "../contracts/models";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private apiUrl = 'https://localhost:7071/api/auth';
    private usernameSource = new BehaviorSubject<string | null>(null);
    currentUsername = this.usernameSource.asObservable();

    constructor(private http: HttpClient) {}

    register(registerDto: IRegisterUser): Observable<string> {
        return this.http.post<string>(`${this.apiUrl}/register`, registerDto);
      }
    
      login(loginDto: ILoginUser): Observable<{ token: string }> {
        return this.http.post<{ token: string }>(`${this.apiUrl}/login`, loginDto);
      }
    
      logout(): Observable<void> {
        return this.http.post<void>(`${this.apiUrl}/logout`, null);
      }
    
      getUserInfo(username: string): Observable<IUserInfo> {
        return this.http.get<any>(`${this.apiUrl}/${username}`);
      }

      updateUsername(username: string | null) {
        this.usernameSource.next(username);
      }

      isAdmin(): boolean {
        const role = sessionStorage.getItem('role');
        return role === Role.Admin.toString();
      }
}
