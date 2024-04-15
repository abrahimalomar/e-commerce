import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IProduct } from '../../models/product.model';
import { ProductService } from '../../Services/product.service';
import { ICategory } from '../../models/category.model';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ProductListComponent } from "../product-list/product-list.component";
import { IProductDTO } from '../../models/ProductModelView';
import { CategoryService } from '../../Services/category.service';


@Component({
    selector: 'app-product-add',
    standalone: true,
    templateUrl: './product-add.component.html',
    styleUrl: './product-add.component.css',
    imports: [
      ReactiveFormsModule, CommonModule, 
      RouterModule, ProductListComponent,
    //  StoreModule.forRoot({ product: productReducer })
    ]
})

export class ProductAddComponent implements OnInit{
  
  categories$!: Observable<ICategory[]>;
  productsWithcategories$!: Observable<IProductDTO[]>;
  productForm!:FormGroup

  constructor(private formBuilder: FormBuilder,
              private productService:ProductService,
              private router:Router,
              private categoryService:CategoryService
            ){
  }


  ngOnInit(): void {
    this.productForm=this.formBuilder.group({
      name:['',Validators.required],
      discount:['',Validators.required],
      price:['',Validators.required],
      quantity:['',Validators.required],
      categoryId:['',Validators.required],
       image: [''] 
    
    }),

   this.categories$= this.categoryService.getAllCategory();
  }

 
  
  Add() {
    if (this.productForm.valid) {
      const name = this.productForm.value.name;
      const discount = this.productForm.value.discount;
      const price = this.productForm.value.price;
      const quantity = this.productForm.value.quantity;
      const categoryId = this.productForm.value.categoryId;
      const image = this.productForm.value.image;
  
      const productData: IProduct = {
        name: name,
        price: price,
        Discount: discount,
        Quantity: quantity,
        image: image.name,
        CategoryId: categoryId,
      };
      console.log(productData.image);
      this.productService.create(productData).subscribe(
        response => {
          console.log(response);
          console.log('Added Product');
        },
        error => {
          console.error(error);
          
          console.log(error.message);
        }
      );
    }
  }
  

onFileSelected(event: any) {
  const file: File = event.target.files[0];
  if (file) {
    this.productForm.patchValue({
      image: file
    });
  }
}



}



