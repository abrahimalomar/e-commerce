import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { LogIn } from '../models/LogIn';
import { LoginResponse } from '../models/LoginResponse';
import { IUser } from '../models/user';
import { IRegister } from '../models/register';

@Injectable({
  providedIn: 'root'
})
export class AuthService{
  private userId: string | null = null;
  private loggedInUserId: string | null = null
  private apiUrl = 'https://localhost:44321/api/Accounts'; 
  private readonly USER_ID_KEY = 'userId';
  constructor(private http: HttpClient) { }
 

   setUserId(userId: string): void {
    sessionStorage.setItem(this.USER_ID_KEY, userId);
  }

  getUserId(): string | null {
    return sessionStorage.getItem(this.USER_ID_KEY);
  }

  clearUserId(): void {
    sessionStorage.removeItem(this.USER_ID_KEY);
  }
  getLoggedInUserId(): string | null {
    return this.loggedInUserId;
  }
 private getToken(){
  const token = localStorage.getItem('accessToken');
  const tokenExpiration = localStorage.getItem('tokenExpiration');
 
  
    return  new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    
   }
 
  getAllUser():Observable<IUser[]>{
    const headers = this.getToken();
    const authorizationHeaderValue = headers.get('Authorization');
    const token = authorizationHeaderValue ? authorizationHeaderValue.split(' ')[1] : null;
 //const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiVXNlcjc3IiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiI1MTkzZDk0OC1kYzFhLTRjMjAtOWVlOC1mMGMzMDQxYjUxNmUiLCJqdGkiOiI4M2JmNWY3My0wYzE1LTRmMWYtYmViMi0yYWI0NTA5ZjE5NDQiLCJleHAiOjE3MTI5Mzc1MjAsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6MTUwMDUiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjU1NTU1In0.bghdjHwr-JeAobLxtirGdiGZhYdT3qaWyc5vnfpMC44';

    const httpOptions = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };
    return this.http.get<IUser[]>(`${this.apiUrl}/GetAll`,httpOptions)
  }

  login(loginData: LogIn): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, loginData)
      .pipe(
        tap(response => {
          this.saveToken(response.accessToken); // حفظ التوكن في LocalStorage
          this.loggedInUserId = response.userId;
          console.log('response.userId',response.userId);
           // تعيين معرف المستخدم المسجل دخوله
        }), //Save LocalStorage
        catchError(this.handleError)
      );
  }

  register(register:IRegister){

    return this.http.post<IRegister>(`${this.apiUrl}/Register`,register)
  }
  
  refreshToken(refreshToken: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/refresh-token`, { Token: refreshToken })
      .pipe(
        tap(response => this.saveToken(response.accessToken)), //  LocalStorage
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // خطأ على جانب العميل
      errorMessage = `An error occurred: ${error.error.message}`;
    } else {
      // خطأ على جانب الخادم
      errorMessage = `Server returned code: ${error.status}, error message is: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

  // حفظ التوكن في LocalStorage
  private saveToken(token: string): void {
    localStorage.setItem('accessToken', token);
  }
}