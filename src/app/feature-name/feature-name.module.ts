import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';

import { CategoryListComponent } from '../components/category-list/category-list.component';
import { reducers } from '../Store';


@NgModule({

  imports: [
    CommonModule,
    StoreModule.forFeature('feature', reducers),
    CategoryListComponent, // إضافة المكون هنا
    
  ],
})

export class FeatureNameModule { }



