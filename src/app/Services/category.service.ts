import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { ICategory } from '../models/category.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HandleErrorService } from './handle-error.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl='https://localhost:44321/api/Categories';
  constructor(private http: HttpClient,
    private handleErrorService:HandleErrorService
  ) {}
  private getHttpOptions(): { headers: HttpHeaders } {
    const token = localStorage.getItem('accessToken');
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
  }
  update(id: number, data: ICategory): Observable<ICategory> {
    return this.http.put<ICategory>(`${this.apiUrl}/Edit/${id}`, data, this.getHttpOptions()).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }
  getAllCategory(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(this.apiUrl, this.getHttpOptions()).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }
  delete(id: number): Observable<ICategory> {
    return this.http.delete<ICategory>(`${this.apiUrl}/${id}`, this.getHttpOptions()).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }

  geById(id: number): Observable<ICategory> {
    return this.http.get<ICategory>(`${this.apiUrl}/${id}`, this.getHttpOptions()).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }
}
