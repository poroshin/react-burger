import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { selectedIngredientsReducer } from './selectedIngredients';
import { orderReducer } from './order';
import { profileReducer } from './profile';

export const rootReducer = combineReducers({
	ingredients: ingredientsReducer,
	selectedIngredients: selectedIngredientsReducer,
	order: orderReducer,
	profile: profileReducer
});

export type TRootState = ReturnType<typeof rootReducer>;