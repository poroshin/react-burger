import { AppDispatch, AppThunk, TOrderData } from '../types';
import { getOrderRequest } from '../api';

import {
  GET_ORDER_REQUEST,
  GET_ORDER_FAILED,
  GET_ORDER_SUCCESS,
  INCREASE_TOTAL_PRICE,
  DELETE_TOTAL_PRICE,
  CLEAR_ORDER,
} from '../constants';

export interface IGetOrderSuccessAction {
  readonly type: typeof GET_ORDER_SUCCESS;
	data: TOrderData;
}

export interface IGetOrderRequestedAction {
  readonly type: typeof GET_ORDER_REQUEST;
}

export interface IGetOrderFailedAction {
  readonly type: typeof GET_ORDER_FAILED;
}

export interface ISetTotalPriceAction {
  readonly type: typeof INCREASE_TOTAL_PRICE;
	price: number;
}

export interface IDeleteTotalPriceAction {
  readonly type: typeof DELETE_TOTAL_PRICE;
}

export interface IClearOrderAction {
  readonly type: typeof CLEAR_ORDER;
}

export type TOrderActions = 
	| IGetOrderSuccessAction
  | IGetOrderRequestedAction
  | IGetOrderFailedAction
  | ISetTotalPriceAction
  | IDeleteTotalPriceAction
  | IClearOrderAction;

export const getOrder: AppThunk = (ingredientsToOrder) => {
  return function(dispatch: AppDispatch) {
    dispatch(getOrderRequested());
    getOrderRequest(ingredientsToOrder).then(data => {
      dispatch(getOrderSuccess(data));
    })
    .catch((e: number | string | null) => {
      console.log(e);
      dispatch(getOrderFailed());
    })
  };
}

export const getOrderSuccess = (data: TOrderData): IGetOrderSuccessAction => ({
  type: GET_ORDER_SUCCESS,
  data: data
})

export const getOrderRequested = (): IGetOrderRequestedAction => ({
  type: GET_ORDER_REQUEST
})

export const getOrderFailed = (): IGetOrderFailedAction => ({
  type: GET_ORDER_FAILED
})

export const setTotalPrice = (price: number): ISetTotalPriceAction => ({
  type: INCREASE_TOTAL_PRICE,
  price: price
})

export const deleteTotalPrice = (): IDeleteTotalPriceAction => ({
  type: DELETE_TOTAL_PRICE
})

export const clearOrder = (): IClearOrderAction => ({
  type: CLEAR_ORDER
})
