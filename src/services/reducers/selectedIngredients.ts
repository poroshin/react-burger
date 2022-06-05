import { TIngredient, TSelectedIngredients } from '../types';
import { TSelectedIngredientsActions } from '../actions/selectedIngredients';
import {
  SET_BUN_SELECTED_INGREDIENTS,
  DELETE_BUN_SELECTED_INGREDIENTS,
	ADD_ITEM_SELECTED_INGREDIENTS,
	DELETE_ITEM_SELECTED_INGREDIENTS,
  SORT_INGREDIENTS,
  CLEAR_INGREDIENTS,
} from '../constants';

export type TSelectedIngredientsState = {
	bun: TIngredient | null;
	data: TIngredient[];
};

const selectedIngredientsInitialState: TSelectedIngredients = {
  bun: null,
	data: []
};

export const selectedIngredientsReducer = (state: TSelectedIngredientsState = selectedIngredientsInitialState, action: TSelectedIngredientsActions): TSelectedIngredientsState => {
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
        ...state,
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
