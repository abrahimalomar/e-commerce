import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IProduct } from '../../models/product.model';
import { ProductService } from '../../Services/product.service';
import { ICategory } from '../../models/category.model';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-add',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.css'
})
export class ProductAddComponent implements OnInit{
  
  categories$!: Observable<ICategory[]>;

  productForm!:FormGroup

  constructor(private formBuilder: FormBuilder,
    private productService:ProductService){}


  ngOnInit(): void {
    this.productForm=this.formBuilder.group({
      name:['',Validators.required],
      discount:['',Validators.required],
      price:['',Validators.required],
      quantity:['',Validators.required],
      categoryId:['',Validators.required]
    })

   this.categories$= this.productService.getAllCategory();
  }
Add() {

  if(this.productForm.value){
    const name=this.productForm.value.name;
    const discount=this.productForm.value.discount;
    const price=this.productForm.value.price;
    const quantity=this.productForm.value.quantity;
    const categoryId = this.productForm.value.categoryId;

    const productData:IProduct={
      name:name,
      price:price,
      Discount:discount,
      Quantity:quantity,
      CategoryId:categoryId
    }
    console.log(productData);
    
this.productService.create(productData).subscribe(
  respnse=>{
    console.log(respnse);
    
  },
  error=>{
    console.log(error);
    
  }
)
  }

}

}
