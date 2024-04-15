import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../Services/product.service';
import { IProductDTO } from '../../models/ProductModelView';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ICategory } from '../../models/category.model';
import { IProduct } from '../../models/product.model';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../Services/category.service';

@Component({
  selector: 'app-product-edit',
  standalone:true,
  imports:[ReactiveFormsModule ,CommonModule,RouterModule],
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],

})
export class ProductEditComponent implements OnInit {

  categories$!: Observable<ICategory[]>;
  editProductForm!: FormGroup;
  productId!: number;

  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private categoryService:CategoryService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.getCategories();

   
    this.route.params.pipe(
      switchMap(params => {
        this.productId = params['id'];

        return this.productService.geById(this.productId);
      })
    ).subscribe((product: IProduct) => {

      this.editProductForm.patchValue({
        name: product.name,
        discount: product.Discount,
        price: product.price,
        quantity: product.Quantity,
        categoryId: product.CategoryId
      });
    });

    this.editProductForm = this.formBuilder.group({
      name: ['', Validators.required],
      discount: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required],
      categoryId: ['', Validators.required]
    });
  }

  getCategories(): void {
    this.categories$ = this.categoryService.getAllCategory();
  }

  Edit(): void {
    if (this.editProductForm.valid) {
      const name = this.editProductForm.value.name;
      const discount = this.editProductForm.value.discount;
      const price = this.editProductForm.value.price;
      const quantity = this.editProductForm.value.quantity;
      const categoryId = this.editProductForm.value.categoryId;
      const image = this.editProductForm.value.image;
      const productData: IProduct = {
        name: name,
        price: price,
        Discount: discount,
        Quantity: quantity,
        image:image,
        CategoryId: categoryId
      };

      this.productService.update(this.productId, productData).subscribe(
        response => {
          console.log('Product updated successfully:', response);
          // Redirect or show success message
          this.router.navigate(['/product'])
        },
        error => {
          console.error('Error updating product:', error);
          // Handle error
        }
      );
    }
  }
}
