import { TReducerOrder } from '../types';

import {
  GET_ORDER_REQUEST,
  GET_ORDER_FAILED,
  GET_ORDER_SUCCESS,
  INCREASE_TOTAL_PRICE,
  DELETE_TOTAL_PRICE,
} from '../actions/order';

const orderInitialState = {
	isLoaded: false,
	isFailed: false,
	isRequested: false,
  name: null,
  totalPrice: 0,
	orderNumber: 0
};

export const orderReducer = (state = orderInitialState, action: TReducerOrder) => {
  switch (action.type) {
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        isFailed: false,
        isRequested: true
      };
    }
    case GET_ORDER_FAILED: {
      return {
        ...state,
        isFailed: true,
        isRequested: false
      };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        name: action.data.name,
        orderNumber: action.data.order.number,
        isLoaded: true,
        isRequested: false
      };
    }
    case INCREASE_TOTAL_PRICE: {
      return {
        ...state,
        totalPrice: state.totalPrice + action.price
      };
    }
    case DELETE_TOTAL_PRICE: {
      return {
        ...state,
        totalPrice: 0
      };
    }
    default: {
      return state;
    }
  }
};