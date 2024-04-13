import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { provideClientHydration } from '@angular/platform-browser';
import { Routes, provideRouter } from '@angular/router';
import { AppComponent } from './app.component';
import { LogInComponent } from './log-in/log-in.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { ProductUserComponent } from './components/product-user/product-user.component';
import { RegisterComponent } from './components/register/register.component';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';

export const routes: Routes = 
[
    {path:'', component : AppComponent},
    // { path: 'userDetails/:Id', component:  UserDetailsComponent},
    {path:'login',component:LogInComponent},
    {path:'product',component:ProductListComponent},
    {path:'category',component:CategoryListComponent},
    {path:'users',component:UserListComponent},
    {path:'AddProduct',component:ProductAddComponent},
    // {path:'Pay:id',component:ProductUserComponent},
    { path: 'Pay/:id', component: ProductUserComponent },
    {path:'Edit/:id',component:ProductEditComponent},
    {path:'register',component:RegisterComponent},

    
    { path: '', redirectTo: 'list', pathMatch: 'full' },
];
@NgModule({
    imports: [
      FormsModule,
      HttpClientModule,
 
    ],
    providers: [
      provideRouter(routes),
      provideClientHydration(),
     
   
    ],
  })
  export class AppConfigModule { }