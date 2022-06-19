import { TIngredient } from '../types';
import { TIngredientsActions } from '../actions/ingredients';
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

export type TIngredientsState = {
	isLoaded: boolean;
	isFailed: boolean;
	isRequested: boolean;
	data: TIngredient[];
};

const ingredientsInitialState = {
	isLoaded: false,
	isFailed: false,
	isRequested: false,
	data: []
};

export const ingredientsReducer = (state: TIngredientsState = ingredientsInitialState, action: TIngredientsActions): TIngredientsState => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        isFailed: false,
        isRequested: true
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        isFailed: true,
        isRequested: false
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        data: [...action.data].map(item =>
          item.count == null ? { ...item, count: 0 } : item
        ),
        isLoaded: true,
        isRequested: false
      };
    }
    case INCREASE_INGREDIENT_COUNT: {
      return {
        ...state,
        data: [...state.data].map((item: TIngredient) =>
          item._id === action.ingredient._id ? { ...item, count: ++item.count } : item
        )
      };
    }
    case DECREASE_INGREDIENT_COUNT: {
      return {
        ...state,
        data: [...state.data].map((item: TIngredient) =>
          item._id === action.ingredient._id ? { ...item, count: --item.count } : item
        )
      };
    }
    case SET_BUN_COUNT: {
      return {
        ...state,
        data: [...state.data].map((item: TIngredient) =>
          item._id === action.ingredient._id ? { ...item, count: 2 } : item
        )
      };
    }
    case DELETE_BUN_COUNT: {
      return {
        ...state,
        data: [...state.data].map((item: TIngredient) =>
          item.type === 'bun' ? { ...item, count: 0 } : item
        )
      };
    }
    case CLEAR_ALL_COUNT: {
      return {
        ...state,
        data: [...state.data].map((item: TIngredient) =>
          item.count != 0 ? { ...item, count: 0 } : item
        )
      };
    }
    default: {
      return state;
    }
  }
};