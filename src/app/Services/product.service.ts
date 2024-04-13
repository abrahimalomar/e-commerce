import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, catchError } from 'rxjs';
import { IProductDTO } from '../models/ProductModelView';
import { ICategory } from '../models/category.model';
import { IProduct } from '../models/product.model';
import { HandleErrorService } from './handle-error.service';
import { UserProduct } from '../models/userProduct';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})

export class ProductService {

  private apiUrl = 'https://localhost:44321/api/Products';

  constructor(private http: HttpClient,
    private handleErrorService: HandleErrorService
  ) { }


  private getToken() {
    const token = localStorage.getItem('accessToken');
    const tokenExpiration = localStorage.getItem('tokenExpiration');


    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

  }

  getProductsWithCategory(): Observable<IProductDTO[]> {
    const headers = this.getToken();
    const authorizationHeaderValue = headers.get('Authorization');
    const token = authorizationHeaderValue ? authorizationHeaderValue.split(' ')[1] : null;

    //const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiVXNlcjc3IiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiI1MTkzZDk0OC1kYzFhLTRjMjAtOWVlOC1mMGMzMDQxYjUxNmUiLCJqdGkiOiI4M2JmNWY3My0wYzE1LTRmMWYtYmViMi0yYWI0NTA5ZjE5NDQiLCJleHAiOjE3MTI5Mzc1MjAsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6MTUwMDUiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjU1NTU1In0.bghdjHwr-JeAobLxtirGdiGZhYdT3qaWyc5vnfpMC44';
    const httpOptions = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };
    return this.http.get<IProductDTO[]>(`${this.apiUrl}/GetProductsWithCategory`, httpOptions)
      .pipe(
        tap(p => console.log(p)
        ),
        catchError(this.handleErrorService.handleError)
      );
  }

  getAllProduct(): Observable<IProduct[]> {
    const headers = this.getToken();
    const authorizationHeaderValue = headers.get('Authorization');
    const token = authorizationHeaderValue ? authorizationHeaderValue.split(' ')[1] : null;
    const httpOptions = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    console.log('local storage Token : ', token);

    return this.http.get<IProduct[]>(this.apiUrl, httpOptions);
  }
  getAllCategory(): Observable<ICategory[]> {

    const headers = this.getToken();
    const authorizationHeaderValue = headers.get('Authorization');
    const token = authorizationHeaderValue ? authorizationHeaderValue.split(' ')[1] : null;
    const httpOptions = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };
    return this.http.get<ICategory[]>('https://localhost:44321/api/Categories', httpOptions);
  }

  create(data: IProduct): Observable<IProduct> {

    const headers = this.getToken();
    const authorizationHeaderValue = headers.get('Authorization');
    const token = authorizationHeaderValue ? authorizationHeaderValue.split(' ')[1] : null;
    const httpOptions = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };
    return this.http.post<IProduct>(this.apiUrl, data, httpOptions).pipe(
      map((response: IProduct) => {

        return response;
      })
    );
  }



  update(id: number, data: IProduct): Observable<IProduct> {
    const headers = this.getToken();
    const authorizationHeaderValue = headers.get('Authorization');
    const token = authorizationHeaderValue ? authorizationHeaderValue.split(' ')[1] : null;
    const httpOptions = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };
    return this.http.put<IProduct>(`${this.apiUrl}/${id}`, data,httpOptions);
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
    const headers = this.getToken();
    const authorizationHeaderValue = headers.get('Authorization');
    const token = authorizationHeaderValue ? authorizationHeaderValue.split(' ')[1] : null;
    const httpOptions = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };
    return this.http.delete<IProductDTO>(`${this.apiUrl}/${id}`, httpOptions);
  }

  geById(id: number): Observable<IProduct> {
    const headers = this.getToken();
    const authorizationHeaderValue = headers.get('Authorization');
    const token = authorizationHeaderValue ? authorizationHeaderValue.split(' ')[1] : null;
    const httpOptions = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };
    return this.http.get<IProduct>(`${this.apiUrl}/GetProduct/${id}`,httpOptions);
  }
  
}


