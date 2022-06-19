import { orderReducer } from "./order";
import {
  GET_ORDER_REQUEST,
  GET_ORDER_FAILED,
  GET_ORDER_SUCCESS,
  INCREASE_TOTAL_PRICE,
  DELETE_TOTAL_PRICE,
  CLEAR_ORDER,
} from '../constants';

import * as data from '../../utils/test-data';

const orderInitialState = {
	isLoaded: false,
	isFailed: false,
	isRequested: false,
  orderName: null,
  totalPrice: 0,
	orderNumber: 0
};

describe('order reducer', () => {
  it('should return the initial state', () => {
    expect(
      orderReducer(undefined, {})
    ).toEqual(orderInitialState)
  })

  it('should handle GET_ORDER_REQUEST', () => {
    expect(
      orderReducer(orderInitialState, {
        type: GET_ORDER_REQUEST,
      })
    ).toEqual(
      {
        ...orderInitialState,
        isFailed: false,
        isRequested: true
      }
    )
  })

  it('should handle GET_ORDER_FAILED', () => {
    expect(
      orderReducer(orderInitialState, {
        type: GET_ORDER_FAILED,
      })
    ).toEqual(
      {
        ...orderInitialState,
        isFailed: true,
        isRequested: false
      }
    )
  })

  it('should handle GET_ORDER_SUCCESS', () => {
    expect(
      orderReducer(orderInitialState, {
        type: GET_ORDER_SUCCESS,
        data: data.order
      })
    ).toEqual(
      {
        ...orderInitialState,
        orderName: 'Название заказа',
        orderNumber: 123,
        isLoaded: true,
        isRequested: false
      }
    )
  })

  it('should handle INCREASE_TOTAL_PRICE', () => {
    expect(
      orderReducer({
        ...orderInitialState,
        totalPrice: 100,
      }, {
        type: INCREASE_TOTAL_PRICE,
        price: 10
      })
    ).toEqual(
      {
        ...orderInitialState,
        totalPrice: 110,
      }
    )
  })

  it('should handle DELETE_TOTAL_PRICE', () => {
    expect(
      orderReducer({
        ...orderInitialState,
        totalPrice: 100,
      }, {
        type: DELETE_TOTAL_PRICE,
      })
    ).toEqual(
      {
        ...orderInitialState,
        totalPrice: 0,
      }
    )
  })

  it('should handle DELETE_TOTAL_PRICE', () => {
    expect(
      orderReducer({
        ...orderInitialState,
        totalPrice: 100,
      }, {
        type: DELETE_TOTAL_PRICE,
      })
    ).toEqual(
      {
        ...orderInitialState,
        totalPrice: 0,
      }
    )
  })

  it('should handle CLEAR_ORDER', () => {
    expect(
      orderReducer({
        ...orderInitialState,
        totalPrice: 100,
      }, {
        type: CLEAR_ORDER,
      })
    ).toEqual(orderInitialState)
  })
})