import { selectedIngredientsReducer } from "./selectedIngredients";
import {
  SET_BUN_SELECTED_INGREDIENTS,
  DELETE_BUN_SELECTED_INGREDIENTS,
	ADD_ITEM_SELECTED_INGREDIENTS,
	DELETE_ITEM_SELECTED_INGREDIENTS,
  SORT_INGREDIENTS,
  CLEAR_INGREDIENTS,
} from '../constants';

import * as data from '../../utils/test-data';

const selectedIngredientsInitialState = {
  bun: null,
	data: []
};

describe('selectedIngredients reducer', () => {
  it('should return the initial state', () => {
    expect(
      selectedIngredientsReducer(undefined, {})
    ).toEqual(selectedIngredientsInitialState)
  })

  it('should handle SET_BUN_SELECTED_INGREDIENTS', () => {
    expect(
      selectedIngredientsReducer(selectedIngredientsInitialState, {
        type: SET_BUN_SELECTED_INGREDIENTS,
        ingredient: data.ingredientBun
      })
    ).toEqual(
      {
        ...selectedIngredientsInitialState,
        bun: data.ingredientBun,
      }
    )
  })

  it('should handle DELETE_BUN_SELECTED_INGREDIENTS', () => {
    expect(
      selectedIngredientsReducer(selectedIngredientsInitialState, {
        type: DELETE_BUN_SELECTED_INGREDIENTS,
      })
    ).toEqual(
      {
        ...selectedIngredientsInitialState,
        bun: null,
      }
    )
  })

  it('should handle ADD_ITEM_SELECTED_INGREDIENTS', () => {
    expect(
      selectedIngredientsReducer({
        bun: null,
        data: [data.ingredientMain]
      }, {
        type: ADD_ITEM_SELECTED_INGREDIENTS,
        ingredient: data.ingredientMain2
      })
    ).toEqual(
      {
        bun: null,
        data: [data.ingredientMain, data.ingredientMain2]
      }
    )
  })

  it('should handle DELETE_ITEM_SELECTED_INGREDIENTS', () => {
    expect(
      selectedIngredientsReducer({
        bun: null,
        data: [data.ingredientMain, data.ingredientMain2]
      }, {
        type: DELETE_ITEM_SELECTED_INGREDIENTS,
        ingredient: data.ingredientMain2
      })
    ).toEqual(
      {
        bun: null,
        data: [data.ingredientMain]
      }
    )
  })

  it('should handle SORT_INGREDIENTS', () => {
    expect(
      selectedIngredientsReducer({
        bun: null,
        data: [data.ingredientMain, data.ingredientMain2]
      }, {
        type: SORT_INGREDIENTS,
        itemFrom: data.ingredientMain,
        itemTo: data.ingredientMain2
      })
    ).toEqual(
      {
        bun: null,
        data: [data.ingredientMain2, data.ingredientMain]
      }
    )
  })

  it('should handle CLEAR_INGREDIENTS', () => {
    expect(
      selectedIngredientsReducer([], {
        type: CLEAR_INGREDIENTS,
      })
    ).toEqual(selectedIngredientsInitialState)
  })
})