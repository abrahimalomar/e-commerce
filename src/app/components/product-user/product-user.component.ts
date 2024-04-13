import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserProduct } from '../../models/userProduct';
import { ProductService } from '../../Services/product.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-product-user',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule],
  templateUrl: './product-user.component.html',
  styleUrl: './product-user.component.css'
})
export class ProductUserComponent {
  userProductForm!: FormGroup;
  userId:string | null='';
  Id:number=0;
  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private auth:AuthService
  ){}

  ngOnInit(): void {

   this. Id = +this.route.snapshot.params['id'];
   console.log('id product details ',this.Id);

   this.userId=this.auth.getLoggedInUserId()
console.log('user Id', this.userId);

   this.userProductForm = this.formBuilder.group({
    productPrice: ['', Validators.required],
    quantity: ['', Validators.required],
    // userId:['',Validators.required],
    // productId:['',Validators.required]
    });
  }

  onSubmit() {
    if (this.userProductForm.valid) {
      const ProductPrice = this.userProductForm.value?.productPrice;
      const Quantity = this.userProductForm.value?.quantity;
      const productId = this.Id;
      const userId = this.userId;
      const date=new Date();
      // Create a loginData object with the username and password
      const userProductData: UserProduct = {
        productPrice:ProductPrice,
        quantity:Quantity,
        productId:productId,
        userId:userId,
        //date:date
      };
      console.log('user Product Data ',userProductData);
      
 
    // Pass the loginData object to the authService.LogIon method
      this.productService.Pay(userProductData).subscribe(
        response=>{
          console.log(response);
          alert(response)
        },
        error=>{
          console.log(error);
          
        }
      )
    
  }
  }
}


