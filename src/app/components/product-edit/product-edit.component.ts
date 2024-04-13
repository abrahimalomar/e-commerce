import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../Services/product.service';
import { IProductDTO } from '../../models/ProductModelView';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ICategory } from '../../models/category.model';
import { IProduct } from '../../models/product.model';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-edit',
  standalone:true,
  imports:[ReactiveFormsModule ,CommonModule],
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
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getCategories();

    // Retrieve product ID from route params
    this.route.params.pipe(
      switchMap(params => {
        this.productId = params['id'];
        // Fetch product details based on ID
        return this.productService.geById(this.productId);
      })
    ).subscribe((product: IProduct) => {
      // Populate form fields with product data
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
    this.categories$ = this.productService.getAllCategory();
  }

  Edit(): void {
    if (this.editProductForm.valid) {
      const name = this.editProductForm.value.name;
      const discount = this.editProductForm.value.discount;
      const price = this.editProductForm.value.price;
      const quantity = this.editProductForm.value.quantity;
      const categoryId = this.editProductForm.value.categoryId;

      const productData: IProduct = {
        name: name,
        price: price,
        Discount: discount,
        Quantity: quantity,
        CategoryId: categoryId
      };

      this.productService.update(this.productId, productData).subscribe(
        response => {
          console.log('Product updated successfully:', response);
          // Redirect or show success message
        },
        error => {
          console.error('Error updating product:', error);
          // Handle error
        }
      );
    }
  }
}
