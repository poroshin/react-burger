import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { selectedIngredientsReducer } from './selectedIngredients';
import { orderReducer } from './order';
import { profileReducer } from './profile';
import { wsReducer } from './wsReducer';

export const rootReducer = combineReducers({
	ingredientsReducer,
	selectedIngredientsReducer,
	orderReducer,
	profileReducer,
  wsReducer
});
