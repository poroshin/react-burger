import { getOrderRequest } from '../api';

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';

export const INCREASE_TOTAL_PRICE = 'INCREASE_TOTAL_PRICE';
export const DELETE_TOTAL_PRICE = 'DELETE_TOTAL_PRICE';

export const getOrder = (selectedIngredients) => {
  return function(dispatch) {
    dispatch({
      type: GET_ORDER_REQUEST
    });
    getOrderRequest(selectedIngredients)
			.then(res => {
				if(res.status >= 200 && res.status < 300){
					return res.json();
				} else {
					dispatch({
						type: GET_ORDER_FAILED
					});
				}
			})
			.then(data => {
				if(data.success){
					dispatch({
						type: GET_ORDER_SUCCESS,
						data: data
					});
				} else {
					dispatch({
						type: GET_ORDER_FAILED
					});
				}
			})
			.catch(e => {
				console.log(e);
        dispatch({
          type: GET_ORDER_FAILED
        });
			})
  };
}

export const setTotalPrice = (price) => {
	return {
		type: INCREASE_TOTAL_PRICE,
		price: price
	}
}

export const deleteTotalPrice = () => {
	return {
		type: DELETE_TOTAL_PRICE
	}
}
