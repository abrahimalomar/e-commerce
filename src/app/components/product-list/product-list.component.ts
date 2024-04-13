import { Component } from '@angular/core';
import { Observable, combineLatest, catchError, map } from 'rxjs';
import { IProductDTO } from '../../models/ProductModelView';
import { ICategory } from '../../models/category.model';
import { IProduct } from '../../models/product.model';
import { ProductService } from '../../Services/product.service';
import { CategoryService } from '../../Services/category.service';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {


  products$!: Observable<IProduct[]>;
  categories$!: Observable<ICategory[]>;

  productsWithcategories$!: Observable<IProductDTO[]>;
  constructor(
     private productService: ProductService,
     private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.productsWithcategories$ = this.productService.getProductsWithCategory();

    


    // استخدام combineLatest لدمج البيانات من طلبين API مختلفين
    this.products$ = combineLatest([
      this.productService.getAllProduct(),
      this.categoryService.getAllCategory()
    ]).pipe(
      catchError(error => {
        // يمكنك هنا التعامل مع الأخطاء إذا حدثت
        console.error('Error fetching data:', error);
        return [];
      }),
      // تحويل النوع المتوقع إلى قائمة المنتجات فقط
      map(([products, categories]) => products)
    );
  }
  Delete(id: number) {
    console.log('product Id ',id);
  this.productService.delete(id).subscribe(
  
    
    response=>{
      console.log(response);
      
    },
    error=>{
      console.log(error);
      
    }
  )
    }
}

