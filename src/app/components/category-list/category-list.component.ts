
import { Component, OnInit } from '@angular/core';
import { ICategory } from '../../models/category.model';
import { Observable } from 'rxjs';
import { CategoryService } from '../../Services/category.service';
import { CommonModule } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';


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
    private router:Router
  ){}

  ngOnInit(): void {
  this.getAll()

  }


  getAll(){
    this.categories$=this.categoryService.getAllCategory()

  }


    Edit(Id:number) {
      console.log('Edit category ID',Id);
      
      this.router.navigate(['editCategory', Id]);
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




