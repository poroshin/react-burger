import { TIngredient } from '../types';

import {
	GET_INGREDIENTS_REQUEST,
	GET_INGREDIENTS_FAILED,
	GET_INGREDIENTS_SUCCESS,
  INCREASE_INGREDIENT_COUNT,
  DECREASE_INGREDIENT_COUNT,
  SET_BUN_COUNT,
  DELETE_BUN_COUNT,
} from '../actions/ingredients';

const ingredientsInitialState = {
	isLoaded: false,
	isFailed: false,
	isRequested: false,
	data: []
};

export const ingredientsReducer = (state = ingredientsInitialState, action: { type: string; data: Array<TIngredient>; ingredient: TIngredient; }) => {
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
    default: {
      return state;
    }
  }
};