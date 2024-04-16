// category-edit.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from '../../Services/category.service';
import { ICategory } from '../../models/category.model';


@Component({
  selector: 'app-category-edit',
  standalone:true,
  imports:[ReactiveFormsModule],
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {
  categoryId: number = 0;
  categoryForm: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private router:Router
  ) {
    this.categoryForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.categoryId = +this.activatedRoute.snapshot.params['Id'];
    console.log('ngOn  Init category Id ',this.categoryId);
    this.loadCategory();
  }

  loadCategory(): void {
    this.categoryService.geById(this.categoryId).subscribe(
      (response: ICategory) => {
        this.categoryForm.patchValue(response);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  updateCategory(): void {
    if (this.categoryForm.valid) {
      console.log('update category ',this.categoryId);
      
      const categoryData: ICategory = this.categoryForm.value;
      this.categoryService.update(this.categoryId, categoryData).subscribe(
        (response: ICategory) => {
          console.log('Category updated successfully: ', response);
          this.router.navigate(['/category'])
        },
        (error: any) => {
          console.log('Error updating category: ', error);
        }
      );
    } else {
      console.log('Please fill out the form correctly.');
    }
  }
}
