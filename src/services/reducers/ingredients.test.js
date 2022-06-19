import { ingredientsReducer } from "./ingredients";
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

import * as data from '../../utils/test-data';

const ingredientsInitialState = {
	isLoaded: false,
	isFailed: false,
	isRequested: false,
	data: []
};

describe('ingredients reducer', () => {
  it('should return the initial state', () => {
    expect(
      ingredientsReducer(undefined, {})
    ).toEqual(ingredientsInitialState)
  })

  it('should handle GET_INGREDIENTS_REQUEST', () => {
    expect(
      ingredientsReducer(ingredientsInitialState, {
        type: GET_INGREDIENTS_REQUEST,
      })
    ).toEqual(
      {
        ...ingredientsInitialState,
        isFailed: false,
        isRequested: true
      }
    )
  })

  it('should handle GET_INGREDIENTS_FAILED', () => {
    expect(
      ingredientsReducer(ingredientsInitialState, {
        type: GET_INGREDIENTS_FAILED,
      })
    ).toEqual(
      {
        ...ingredientsInitialState,
        isFailed: true,
        isRequested: false
      }
    )
  })

  it('should handle GET_INGREDIENTS_SUCCESS', () => {
    expect(
      ingredientsReducer(ingredientsInitialState, {
        type: GET_INGREDIENTS_SUCCESS,
        data: [data.ingredientBun, data.ingredientMain],
      })
    ).toEqual(
      {
        data: [data.ingredientBun, data.ingredientMain],
        isFailed: false,
        isLoaded: true,
        isRequested: false
      }
    )
  })

  it('should handle INCREASE_INGREDIENT_COUNT', () => {
    expect(
      ingredientsReducer(
        {
          data: [data.ingredientBun, data.ingredientMain],
          isFailed: false,
          isLoaded: true,
          isRequested: false
        }, {
        type: INCREASE_INGREDIENT_COUNT,
        ingredient: data.ingredientMain
      })
    ).toEqual(
      {
        data: [data.ingredientBun, data.ingredientMainCount1],
        isFailed: false,
        isLoaded: true,
        isRequested: false
      }
    )
  })

  it('should handle DECREASE_INGREDIENT_COUNT', () => {
    expect(
      ingredientsReducer(
        {
          data: [data.ingredientMainCount1],
          isFailed: false,
          isLoaded: true,
          isRequested: false
        }, {
        type: DECREASE_INGREDIENT_COUNT,
        ingredient: data.ingredientMain
      })
    ).toEqual(
      {
        data: [data.ingredientMainCount1],
        isFailed: false,
        isLoaded: true,
        isRequested: false
      }
    )
  })

  it('should handle SET_BUN_COUNT', () => {
    expect(
      ingredientsReducer(
        {
          data: [data.ingredientBun],
          isFailed: false,
          isLoaded: true,
          isRequested: false
        }, {
        type: SET_BUN_COUNT,
        ingredient: data.ingredientBun
      })
    ).toEqual(
      {
        data: [data.ingredientBunCount2],
        isFailed: false,
        isLoaded: true,
        isRequested: false
      }
    )
  })

  it('should handle DELETE_BUN_COUNT', () => {
    expect(
      ingredientsReducer(
        {
          data: [data.ingredientBunCount2],
          isFailed: false,
          isLoaded: true,
          isRequested: false
        }, {
        type: DELETE_BUN_COUNT,
      })
    ).toEqual(
      {
        data: [data.ingredientBun],
        isFailed: false,
        isLoaded: true,
        isRequested: false
      }
    )
  })

  it('should handle CLEAR_ALL_COUNT', () => {
    expect(
      ingredientsReducer(
        {
          data: [data.ingredientBunCount2, data.ingredientMainCount1],
          isFailed: false,
          isLoaded: true,
          isRequested: false
        }, {
        type: CLEAR_ALL_COUNT,
      })
    ).toEqual(
      {
        data: [data.ingredientBun, data.ingredientMainCount1],
        isFailed: false,
        isLoaded: true,
        isRequested: false
      }
    )
  })
})