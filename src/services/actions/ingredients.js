import { getIngredientsRequest } from '../api';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const INCREASE_INGREDIENT_COUNT = 'PLUS_INGREDIENT_COUNT';
export const DECREASE_INGREDIENT_COUNT = 'MINUS_INGREDIENT_COUNT';
export const SET_BUN_COUNT = 'SET_BUN_COUNT';
export const DELETE_BUN_COUNT = 'DELETE_BUN_COUNT';

export const getIngredients = () => {
  return function(dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST
    });
    getIngredientsRequest()
      .then(res => {
        if(res.status >= 200 && res.status < 300){
          return res.json();
        } else {
					dispatch({
						type: GET_INGREDIENTS_FAILED
					});
        }
      })
      .then(data => {
        if(data.success){
					dispatch({
						type: GET_INGREDIENTS_SUCCESS,
						data: data.data
					});
        } else {
					dispatch({
						type: GET_INGREDIENTS_FAILED
					});
        }
      })
      .catch(e => {
        console.log(e);
				dispatch({
					type: GET_INGREDIENTS_FAILED
				});
      })
  };
}

export const increaseIngredientCount = (ingredient) => {
	return {
		type: INCREASE_INGREDIENT_COUNT,
		ingredient: ingredient
	}
}

export const decreaseIngredientCount = (ingredient) => {
	return {
		type: DECREASE_INGREDIENT_COUNT,
		ingredient: ingredient
	}
}

export const setBunCount = (ingredient) => {
	return {
		type: SET_BUN_COUNT,
		ingredient: ingredient
	}
}

export const deleteBunCount = () => {
	return {
		type: DELETE_BUN_COUNT
	}
}
