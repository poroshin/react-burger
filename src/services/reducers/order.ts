import { TOrderActions } from '../actions/order';
import {
  GET_ORDER_REQUEST,
  GET_ORDER_FAILED,
  GET_ORDER_SUCCESS,
  INCREASE_TOTAL_PRICE,
  DELETE_TOTAL_PRICE,
} from '../constants';

export type TOrderState = {
	isLoaded: boolean;
	isFailed: boolean;
	isRequested: boolean;
  orderName: string | null;
	totalPrice: number;
	orderNumber: number;
};

const orderInitialState = {
	isLoaded: false,
	isFailed: false,
	isRequested: false,
  orderName: null,
  totalPrice: 0,
	orderNumber: 0
};

export const orderReducer = (state: TOrderState = orderInitialState, action: TOrderActions): TOrderState => {
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
        orderName: action.data.name,
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