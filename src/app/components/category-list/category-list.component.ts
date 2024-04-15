/*

import { Component, OnInit } from '@angular/core';
import { ICategory } from '../../models/category.model';
import { Observable } from 'rxjs';
import { CategoryService } from '../../Services/category.service';
import { CommonModule } from '@angular/common';
import { deleteCategory, loadCategories } from '../../Store/category.actions';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../Store';
import { selectAllCategories } from '../../Store/category.state';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent implements OnInit {

  categories$!: Observable<ICategory[]>;


  constructor(private categoryService:CategoryService,
    private store: Store<AppState>
  ){}

  ngOnInit(): void {
  
    this.store.dispatch(loadCategories());
    this.categories$ = this.store.pipe(select(selectAllCategories));
  }


  getAll(){
    this.categories$=this.categoryService.getAllCategory()

  }

  Edit(arg0: number) {
    throw new Error('Method not implemented.');
    }

    delete(id: number) {
      this.store.dispatch(deleteCategory({ id }));
    }
    Delete(id: number) {
      console.log('category Id ',id);
      this.categoryService.delete(id).subscribe(
        response=>{
          console.log(response);
        this.getAll();
          
        },
        error=>{
          console.log(error);
          
        }
      )
    }
}

*/



/*
import { Component, OnInit } from '@angular/core';
import { ICategory } from '../../models/category.model';
import { Observable } from 'rxjs';
import { CategoryService } from '../../Services/category.service';
import { CommonModule } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../Store';
import { deleteCategory, loadCategories } from '../../Store/category.actions';
import { selectAllCategories } from '../../Store/category.state';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent implements OnInit {

  categories$!: Observable<ICategory[]>;


  constructor(private categoryService:CategoryService,
    private store: Store<AppState>
  ){}

  ngOnInit(): void {
  
    this.store.dispatch(loadCategories());
    this.categories$ = this.store.pipe(select(selectAllCategories));
  }


  Edit(arg0: number) {
    throw new Error('Method not implemented.');
  }

  delete(id: number) {
    this.store.dispatch(deleteCategory({ id }));
  }

  Delete(id: number) {
    console.log('category Id ',id);
    this.categoryService.delete(id).subscribe(
      response=>{
        console.log(response);
        this.store.dispatch(loadCategories()); // Reload categories after delete
      },
      error=>{
        console.log(error);
      }
    );
  }
}

*/
import { Component, OnInit } from '@angular/core';
import { ICategory } from '../../models/category.model';
import { Observable } from 'rxjs';
import { CategoryService } from '../../Services/category.service';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../Store';
import { deleteCategory, loadCategories } from '../../Store/category.actions';
import { selectAllCategories } from '../../Store/category.state';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-list',
  standalone:true,
  imports:[CommonModule],
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  
  categories$!: Observable<ICategory[]>;

  constructor(
    private categoryService: CategoryService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(loadCategories());
    this.categories$ = this.store.pipe(select(selectAllCategories));
  }

  Edit(arg0: number) {
    throw new Error('Method not implemented.');
  }

  delete(id: number) {
    this.store.dispatch(deleteCategory({ id }));
  }

  Delete(id: number) {
    console.log('category Id ', id);
    this.categoryService.delete(id).subscribe(
      response => {
        console.log(response);
        this.store.dispatch(loadCategories()); // Reload categories after delete
      },
      error => {
        console.log(error);
      }
    );
  }
}



