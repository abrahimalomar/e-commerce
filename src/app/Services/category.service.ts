import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory } from '../models/category.model';
import { HttpClient } from '@angular/common/http';
import { HandleErrorService } from './handle-error.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl='https://localhost:44321/api/Products';
  constructor(private http: HttpClient,
    private handleErrorService:HandleErrorService
  ) {}

  getAllCategory(): Observable<ICategory[]> {
    
    // const httpOptions = {
    //   headers: this.getToken() 
    // };
    return this.http.get<ICategory[]>(this.apiUrl);
  }
}
