import { TIngredient } from '../types';

import {
  SET_BUN_SELECTED_INGREDIENTS,
  DELETE_BUN_SELECTED_INGREDIENTS,
	ADD_ITEM_SELECTED_INGREDIENTS,
	DELETE_ITEM_SELECTED_INGREDIENTS,
  SORT_INGREDIENTS,
  CLEAR_INGREDIENTS,
} from '../constants';

export interface ISetBunSelectedIngredientsAction {
  readonly type: typeof SET_BUN_SELECTED_INGREDIENTS;
	ingredient: TIngredient;
}

export interface IDeleteBunSelectedIngredientsAction {
  readonly type: typeof DELETE_BUN_SELECTED_INGREDIENTS;
}

export interface IAddItemSelectedIngredientsAction {
  readonly type: typeof ADD_ITEM_SELECTED_INGREDIENTS;
	ingredient: TIngredient;
}

export interface IDeleteItemSelectedIngredientsAction {
  readonly type: typeof DELETE_ITEM_SELECTED_INGREDIENTS;
	ingredient: TIngredient;
}

export interface ISortIngredientsAction {
  readonly type: typeof SORT_INGREDIENTS;
	itemFrom: TIngredient;
	itemTo: TIngredient;
}

export interface IClearIngredientsAction {
  readonly type: typeof CLEAR_INGREDIENTS;
}

export type TSelectedIngredientsActions = 
	| ISetBunSelectedIngredientsAction
  | IDeleteBunSelectedIngredientsAction
  | IAddItemSelectedIngredientsAction
  | IDeleteItemSelectedIngredientsAction
  | ISortIngredientsAction
	| IClearIngredientsAction;

export const setBunSelectedIngredients = (ingredient: TIngredient): ISetBunSelectedIngredientsAction => ({
	type: SET_BUN_SELECTED_INGREDIENTS,
	ingredient: ingredient
})

export const deleteBunSelectedIngredients = (): IDeleteBunSelectedIngredientsAction => ({
	type: DELETE_BUN_SELECTED_INGREDIENTS
})

export const addItemSelectedIngredients = (ingredient: TIngredient): IAddItemSelectedIngredientsAction => ({
	type: ADD_ITEM_SELECTED_INGREDIENTS,
	ingredient: ingredient
})

export const deleteItemSelectedIngredients = (ingredient: TIngredient): IDeleteItemSelectedIngredientsAction => ({
	type: DELETE_ITEM_SELECTED_INGREDIENTS,
	ingredient: ingredient
})

export const sortIngredients = (itemFrom: TIngredient, itemTo: TIngredient): ISortIngredientsAction => ({
	type: SORT_INGREDIENTS,
	itemFrom: itemFrom,
	itemTo: itemTo
})

export const clearIngredients = () => ({
	type: CLEAR_INGREDIENTS
})
