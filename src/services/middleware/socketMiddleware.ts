import type { Middleware, MiddlewareAPI } from 'redux';
import { AppDispatch, RootState, TWsActions } from '../types';

export const socketMiddleware = (wsActions: TWsActions): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return next => action => {
      const { dispatch } = store;
      const { type, wsUrl, token } = action;
      const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;
      if (type === wsInit) {
        socket = token 
        ? new WebSocket(`${wsUrl}?token=${token}`)
        : new WebSocket(`${wsUrl}`);
      }
      if (socket) {
        socket.onopen = event => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = event => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          dispatch({ type: onMessage, payload: restParsedData });
        };

        socket.onclose = event => {
          dispatch({ type: onClose, payload: event });
        };
      }

      next(action);
    };
  }) as Middleware;
};