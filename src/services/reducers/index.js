import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { selectedIngredientsReducer } from './selectedIngredients';
import { orderReducer } from './order';

export const rootReducer = combineReducers({
	ingredients: ingredientsReducer,
	selectedIngredients: selectedIngredientsReducer,
	order: orderReducer
});