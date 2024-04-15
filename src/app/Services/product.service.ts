import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { IProductDTO } from '../models/ProductModelView';
import { ICategory } from '../models/category.model';
import { IProduct } from '../models/product.model';
import { HandleErrorService } from './handle-error.service';
import { UserProduct } from '../models/userProduct';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'https://localhost:44321/api/Products';

  constructor(private http: HttpClient, private handleErrorService: HandleErrorService) { }

  private getHttpOptions(): { headers: HttpHeaders } {
    const token = localStorage.getItem('accessToken');
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
  }

  getProductsWithCategory(): Observable<IProductDTO[]> {
    return this.http.get<IProductDTO[]>(`${this.apiUrl}/GetProductsWithCategory`, this.getHttpOptions()).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }

  getAllProduct(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.apiUrl, this.getHttpOptions()).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }

 
  create(data: IProduct): Observable<IProduct> {
    console.log("Request before sending:", data);
    
    return this.http.post<IProduct>(this.apiUrl, data, this.getHttpOptions()).pipe(
      map((response: IProduct) => response),
      catchError(this.handleErrorService.handleError)
    );
  }

  update(id: number, data: IProduct): Observable<IProduct> {
    return this.http.put<IProduct>(`${this.apiUrl}/${id}`, data, this.getHttpOptions()).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }

  Pay(userProduct: UserProduct) {
    return this.http.post('https://localhost:44321/api/Home', userProduct).pipe(
      map(response => {
        if (typeof response === 'string') {
          return response;
        } else {
          return JSON.stringify(response);
        }
      })
    );
  }

  delete(id: number): Observable<IProductDTO> {
    return this.http.delete<IProductDTO>(`${this.apiUrl}/${id}`, this.getHttpOptions()).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }

  geById(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.apiUrl}/GetProduct/${id}`, this.getHttpOptions()).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }
}
