import { wsReducer } from "./wsReducer";
import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_GET_ALL_ORDERS,
  WS_GET_USER_ORDERS,
} from '../constants';

import * as data from '../../utils/test-data';

const wsInitialState = {
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

describe('wsReducer reducer', () => {
  it('should return the initial state', () => {
    expect(
      wsReducer(undefined, {})
    ).toEqual(wsInitialState)
  })

  it('should handle WS_CONNECTION_START', () => {
    expect(
      wsReducer(wsInitialState, {
        type: WS_CONNECTION_START,
      })
    ).toEqual(
      {
        ...wsInitialState,
        wsConnected: false
      }
    )
  })

  it('should handle WS_CONNECTION_SUCCESS', () => {
    expect(
      wsReducer(wsInitialState, {
        type: WS_CONNECTION_SUCCESS,
      })
    ).toEqual(
      {
        ...wsInitialState,
        wsConnected: true
      }
    )
  })

  it('should handle WS_CONNECTION_CLOSED', () => {
    expect(
      wsReducer(wsInitialState, {
        type: WS_CONNECTION_CLOSED,
      })
    ).toEqual(
      {
        ...wsInitialState,
        wsConnected: false
      }
    )
  })

  it('should handle WS_CONNECTION_ERROR', () => {
    expect(
      wsReducer(wsInitialState, {
        type: WS_CONNECTION_ERROR,
        payload: 'error',
      })
    ).toEqual(
      {
        ...wsInitialState,
        wsConnected: false,
        error: 'error'
      }
    )
  })

  it('should handle WS_GET_ALL_ORDERS', () => {
    expect(
      wsReducer(wsInitialState, {
        type: WS_GET_ALL_ORDERS,
        payload: data.feed
      })
    ).toEqual(
      {
        ...wsInitialState,
        feed: data.feed,
        error: null
      }
    )
  })

  it('should handle WS_GET_USER_ORDERS', () => {
    expect(
      wsReducer(wsInitialState, {
        type: WS_GET_USER_ORDERS,
        payload: data.feed
      })
    ).toEqual(
      {
        ...wsInitialState,
        userFeed: data.feed,
        error: null
      }
    )
  })
})