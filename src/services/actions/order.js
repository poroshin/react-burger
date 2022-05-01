export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';

export const INCREASE_TOTAL_PRICE = 'INCREASE_TOTAL_PRICE';
export const DELETE_TOTAL_PRICE = 'DELETE_TOTAL_PRICE';

export const getOrderSuccess = (data) => {
  return function(dispatch) {
		dispatch({
			type: GET_ORDER_SUCCESS,
			data: data
		});
  };
}

export const getOrderRequested = () => {
  return function(dispatch) {
    dispatch({
      type: GET_ORDER_REQUEST
    });
  };
}

export const getOrderFailed = () => {
  return function(dispatch) {
    dispatch({
      type: GET_ORDER_FAILED
    });
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
