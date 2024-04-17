import { Component, Input } from '@angular/core';
import { IProductDTO } from '../../models/ProductModelView';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  @Input() viewMode = false;
  @Input() currentProduct: IProductDTO = {
    id:0,
    name:'',
    quantity:'',
    price:0,
    discount:0,
    categoryId:0,
    categoryName:''
  };
}
