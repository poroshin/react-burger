import { TIngredient } from '../types';

export const SET_BUN_SELECTED_INGREDIENTS = 'CLEAR_SELECTED_INGREDIENTS';
export const DELETE_BUN_SELECTED_INGREDIENTS = 'CLEAR_SELECTED_INGREDIENTS';
export const ADD_ITEM_SELECTED_INGREDIENTS = 'ADD_ITEM_SELECTED_INGREDIENTS';
export const DELETE_ITEM_SELECTED_INGREDIENTS = 'DELETE_ITEM_SELECTED_INGREDIENTS';
export const CLEAR_SELECTED_INGREDIENTS = 'CLEAR_SELECTED_INGREDIENTS';
export const SORT_INGREDIENTS = 'SORT_INGREDIENTS';
export const CLEAR_INGREDIENTS = 'CLEAR_INGREDIENTS';

export const addItemSelectedIngredients = (ingredient: TIngredient) => {
	return {
		type: ADD_ITEM_SELECTED_INGREDIENTS,
		ingredient: ingredient
	}
}

export const deleteItemSelectedIngredients = (ingredient: TIngredient) => {
	return {
		type: DELETE_ITEM_SELECTED_INGREDIENTS,
		ingredient: ingredient
	}
}

export const setBunSelectedIngredients = (ingredient: TIngredient) => {
	return {
		type: SET_BUN_SELECTED_INGREDIENTS,
		ingredient: ingredient
	}
}

export const deleteBunSelectedIngredients = () => {
	return {
		type: DELETE_BUN_SELECTED_INGREDIENTS
	}
}

export const sortIngredients = (itemFrom: TIngredient, itemTo: TIngredient) => {
	return {
		type: SORT_INGREDIENTS,
		itemFrom: itemFrom,
		itemTo: itemTo
	}
}

export const clearIngredients = () => {
	return {
		type: CLEAR_INGREDIENTS
	}
}