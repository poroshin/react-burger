import { tokenRequest } from '../api';
import { setCookie } from '../../utils/cookie';
import { TOrderFeed, TError } from '../types';

import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_GET_ALL_ORDERS,
  WS_GET_USER_ORDERS,
} from '../constants';

export interface IWsConnectionStartAction {
  readonly type: typeof WS_CONNECTION_START;
  wsUrl: string;
  token: string;
}

export interface IWsConnectionSuccessAction {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}

export interface IWsConnectionClosedAction {
  readonly type: typeof WS_CONNECTION_CLOSED;
}

export interface IWsConnectionErrorAction {
  payload: TError | null;
  readonly type: typeof WS_CONNECTION_ERROR;
}

export interface IWsGetAllOrdersAction {
  payload: TOrderFeed;
  readonly type: typeof WS_GET_ALL_ORDERS;
}

export interface IWsGetUserOrdersAction {
  payload: TOrderFeed;
  readonly type: typeof WS_GET_USER_ORDERS;
}

export type TWsActions = 
  | IWsConnectionStartAction
  | IWsConnectionSuccessAction
  | IWsConnectionClosedAction
  | IWsConnectionErrorAction
  | IWsGetAllOrdersAction
  | IWsGetUserOrdersAction;

export const wsConnectionStart = (wsUrl: string, token: string): IWsConnectionStartAction => ({
  type: WS_CONNECTION_START, 
  wsUrl: wsUrl, 
  token: token
})

export const wsConnectionSuccess = (): IWsConnectionSuccessAction => ({
  type: WS_CONNECTION_SUCCESS
})

export const wsConnectionClosed = (): IWsConnectionClosedAction => ({
  type: WS_CONNECTION_CLOSED
})

export const wsConnectionError = (error: TError): IWsConnectionErrorAction => ({
  type: WS_CONNECTION_ERROR,
  payload: error
})

export const wsGetAllOrders = (feed: TOrderFeed): IWsGetAllOrdersAction => ({
  type: WS_GET_ALL_ORDERS,
  payload: feed
})

export const wsGetUserOrders = (feed: TOrderFeed): IWsGetUserOrdersAction => ({
  type: WS_GET_USER_ORDERS,
  payload: feed
})
