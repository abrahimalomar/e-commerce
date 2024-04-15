import { createAction, props } from '@ngrx/store';
import { ICategory } from '../models/category.model';

export const loadCategories = createAction('[Category] Load Categories');
export const loadCategoriesSuccess = createAction('[Category] Load Categories Success', props<{ categories: ICategory[] }>());
export const deleteCategory = createAction('[Category] Delete Category', props<{ id: number }>());
export const deleteCategorySuccess = createAction('[Category] Delete Category Success', props<{ id: number }>());
