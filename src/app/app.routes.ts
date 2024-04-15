import { HttpClientModule } from '@angular/common/http';
import { NgModule, isDevMode } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { RouterModule, Routes, provideRouter } from '@angular/router';
import { LogInComponent } from './log-in/log-in.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { ProductUserComponent } from './components/product-user/product-user.component';
import { RegisterComponent } from './components/register/register.component';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import {  StoreModule } from '@ngrx/store';
import { reducers } from './Store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule, provideStoreDevtools } from '@ngrx/store-devtools';



export const routes: Routes = 
[
    //{path:'', component : AppComponent},
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
      BrowserModule,
      StoreDevtoolsModule.instrument({
        connectInZone: true,
      }),
      StoreModule.forRoot(reducers),
      EffectsModule.forRoot([]),
     
      // FormsModule,
      // HttpClientModule,
      // StoreModule.forRoot({}),
      // RouterModule.forRoot([]),
      // StoreModule.forRoot(reducers),
  
      // EffectsModule.forRoot([]),
      // StoreDevtoolsModule.instrument({
      //   maxAge: 25, // عدد الحالات التي سيحتفظ بها في تطبيق الويب
      //   //logOnly: environment.production, // حدد إذا كان يجب تسجيل الأدوات أم لا
      // }),
     








      //    StoreModule.forRoot({ product: productReducer }),
  
    ],
   
    providers: [
      provideRouter(routes),
      provideClientHydration(),
      provideStoreDevtools({
        maxAge: 25,
        logOnly: !isDevMode(),
        connectInZone: true
      }),
    ],
  })
  export class AppConfigModule { }

 
