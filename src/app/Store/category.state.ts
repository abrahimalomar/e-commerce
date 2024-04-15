import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import { ICategory } from '../models/category.model';
import * as CategoryActions from './category.actions';

export interface CategoryState extends EntityState<ICategory> {}

export const categoryAdapter: EntityAdapter<ICategory> = createEntityAdapter<ICategory>();

export const initialState: CategoryState = categoryAdapter.getInitialState({});

const getCategoryState = createFeatureSelector<CategoryState>('category');


export const categoryReducer = createReducer(
  initialState,
  on(CategoryActions.loadCategoriesSuccess, (state, { categories }) => {
    return categoryAdapter.setAll(categories, state);
  }),
  on(CategoryActions.deleteCategorySuccess, (state, { id }) => {
    return categoryAdapter.removeOne(id, state);
  })
);



export const {
  selectAll: selectAllCategories
} = categoryAdapter.getSelectors(getCategoryState);
