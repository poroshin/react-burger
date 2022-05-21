import { TReducerSelectedIngredients, TIngredient, TSelectedIngredients } from '../types';

import {
  SET_BUN_SELECTED_INGREDIENTS,
  DELETE_BUN_SELECTED_INGREDIENTS,
	ADD_ITEM_SELECTED_INGREDIENTS,
	DELETE_ITEM_SELECTED_INGREDIENTS,
	CLEAR_SELECTED_INGREDIENTS,
  SORT_INGREDIENTS,
  CLEAR_INGREDIENTS,
} from '../actions/selectedIngredients';

const selectedIngredientsInitialState: TSelectedIngredients = {
  bun: null,
	data: []
};

export const selectedIngredientsReducer = (state = selectedIngredientsInitialState, action: TReducerSelectedIngredients) => {
  switch (action.type) {
    case SET_BUN_SELECTED_INGREDIENTS: {
      return {
        ...state,
        bun: action.ingredient
      };
    }
    case DELETE_BUN_SELECTED_INGREDIENTS: {
      return {
        ...state,
        bun: null
      };
    }
    case ADD_ITEM_SELECTED_INGREDIENTS: {
      return {
        data: [...state.data, action.ingredient]
      };
    }
    case DELETE_ITEM_SELECTED_INGREDIENTS: {
      return {
        ...state,
        data: [...state.data].filter((item: TIngredient) => 
          item.uuid !== action.ingredient.uuid
        )
      };
    }
    case CLEAR_SELECTED_INGREDIENTS: {
      return selectedIngredientsInitialState;
    }
    case SORT_INGREDIENTS: {
			const data = [...state.data];
			const indexItemFrom = data.indexOf(action.itemFrom);
			const indexItemTo = data.indexOf(action.itemTo);
			data.splice(indexItemFrom, 1);
			data.splice(indexItemTo, 0, action.itemFrom);
			return {
        ...state, 
        data
      }
    }
    case CLEAR_INGREDIENTS: {
      return selectedIngredientsInitialState;
    }
    default: {
      return state;
    }
  }
};
