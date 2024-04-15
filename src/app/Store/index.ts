import { ActionReducerMap } from '@ngrx/store';
import { CategoryState, categoryReducer } from './category.state';

export interface AppState {
  category: CategoryState;
}

export const reducers: ActionReducerMap<AppState> = {
  category: categoryReducer
};
