import { AppDispatch, AppThunk, TIngredient } from '../types';
import { getIngredientsRequest } from '../api';

import {
	GET_INGREDIENTS_REQUEST,
	GET_INGREDIENTS_FAILED,
	GET_INGREDIENTS_SUCCESS,
  INCREASE_INGREDIENT_COUNT,
  DECREASE_INGREDIENT_COUNT,
  SET_BUN_COUNT,
  DELETE_BUN_COUNT,
	CLEAR_ALL_COUNT,
} from '../constants';

export interface IGetIngredientsRequestAction {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsSuccessAction {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
	readonly data: ReadonlyArray<TIngredient>;
}

export interface IGetIngredientsFailedAction {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}

export interface IIncreaseIngredientCountAction {
  readonly type: typeof INCREASE_INGREDIENT_COUNT;
	ingredient: TIngredient;
}

export interface IDecreaseIngredientCountAction {
  readonly type: typeof DECREASE_INGREDIENT_COUNT;
	ingredient: TIngredient;
}

export interface ISetBunCountAction {
  readonly type: typeof SET_BUN_COUNT;
	ingredient: TIngredient;
}

export interface IDeleteBunCountAction {
  readonly type: typeof DELETE_BUN_COUNT;
}

export interface IClearAllCountAction {
  readonly type: typeof CLEAR_ALL_COUNT;
}

export type TIngredientsActions = 
	| IGetIngredientsRequestAction
  | IGetIngredientsSuccessAction
  | IGetIngredientsFailedAction
  | IIncreaseIngredientCountAction
  | IDecreaseIngredientCountAction
  | ISetBunCountAction
  | IDeleteBunCountAction
	| IClearAllCountAction;

export const getIngredients: AppThunk = () => {
  return function(dispatch: AppDispatch) {
    dispatch(getIngredientsRequestAction());
    getIngredientsRequest().then(res => {
			dispatch(getIngredientsSuccessAction(res.data));
		})
		.catch((e: number | string | null) => {
			console.log(e);
			dispatch(getIngredientsFailedAction());
		})
  };
}

export const getIngredientsRequestAction = (): IGetIngredientsRequestAction => ({
	type: GET_INGREDIENTS_REQUEST
})

export const getIngredientsSuccessAction = (data: ReadonlyArray<TIngredient>): IGetIngredientsSuccessAction => ({
	type: GET_INGREDIENTS_SUCCESS,
	data: data
})

export const getIngredientsFailedAction = (): IGetIngredientsFailedAction => ({
	type: GET_INGREDIENTS_FAILED
})

export const increaseIngredientCount = (ingredient: TIngredient): IIncreaseIngredientCountAction => ({
	type: INCREASE_INGREDIENT_COUNT,
	ingredient: ingredient
})

export const decreaseIngredientCount = (ingredient: TIngredient): IDecreaseIngredientCountAction => ({
	type: DECREASE_INGREDIENT_COUNT,
	ingredient: ingredient
})

export const setBunCount = (ingredient: TIngredient): ISetBunCountAction => ({
	type: SET_BUN_COUNT,
	ingredient: ingredient
})

export const deleteBunCount = (): IDeleteBunCountAction => ({
	type: DELETE_BUN_COUNT
})

export const clearAllCount = (): IClearAllCountAction => ({
	type: CLEAR_ALL_COUNT
})
