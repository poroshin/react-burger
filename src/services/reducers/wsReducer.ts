import { TOrderFeed, TError } from '../types';
import { TWsActions } from '../actions/wsActions';
import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_GET_ALL_ORDERS,
  WS_GET_USER_ORDERS,
} from '../constants';

export type TWsState = {
  wsConnected: boolean;
  feed: TOrderFeed;
  userFeed: TOrderFeed;
  error: TError | null;
}

const wsInitialState: TWsState = {
	wsConnected: false,
	feed: {
    orders: [],
    total: 0,
    totalToday: 0,
  },
  userFeed: {
    orders: [],
    total: 0,
    totalToday: 0,
  },
  error: null
};

export const wsReducer = (state: TWsState = wsInitialState, action: TWsActions): TWsState => {
  switch (action.type) {
    case WS_CONNECTION_START: {
      return {
        ...state,
        wsConnected: false
      };
    }
    case WS_CONNECTION_SUCCESS: {
      return {
        ...state,
        wsConnected: true
      };
    }
    case WS_CONNECTION_CLOSED: {
      return {
        ...state,
        wsConnected: false
      };
    }
    case WS_CONNECTION_ERROR: {
      return {
        ...state,
        wsConnected: false,
        error: action.payload
      };
    }
    case WS_GET_ALL_ORDERS: {
      return {
        ...state,
        feed: action.payload,
        error: null
      };
    }
    case WS_GET_USER_ORDERS: {
      return {
        ...state,
        userFeed: action.payload,
        error: null
      };
    }
    default: {
      return state;
    }
  }
}
