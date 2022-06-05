import { ThunkAction } from "redux-thunk";
import { Action, ActionCreator } from "redux";
import { store } from '../store';
import { TIngredientsActions } from '../actions/ingredients';
import { TOrderActions } from '../actions/order';
import { TProfileActions } from '../actions/profile';
import { TSelectedIngredientsActions } from '../actions/selectedIngredients';

import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_GET_ALL_ORDERS,
  WS_GET_USER_ORDERS,
} from '../constants';

type TApplicationActions = 
  | TIngredientsActions
  | TOrderActions
  | TProfileActions
  | TSelectedIngredientsActions;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>;

export type TReducerIngredients = {
  isLoaded: boolean;
  isFailed: boolean;
  isRequested: boolean;
  ingredients: boolean;
  data: TIngredient[];
}

export type TSelectedIngredients = {
  bun: TIngredient | null;
  data: TIngredient[];
}

export type TReducerSelectedIngredients = {
  type: string;
  ingredient: TIngredient;
  itemFrom: TIngredient;
  itemTo: TIngredient;
}

export type TOrderData = {
  name: string;
  order: { number: number};
}

export type TReducerOrder = {
  type: string;
  name: string;
  price: number;
  data: TOrderData;
}
export type TIngredient = {
  readonly _id: string;
  readonly name: string;
  readonly type: string;
  readonly proteins: number;
  readonly fat: number;
  readonly carbohydrates: number;
  readonly calories: number;
  readonly price: number;
  readonly image: string;
  readonly image_mobile: string;
  readonly image_large: string;
  readonly __v: number;
  count: number;
  uuid?: string;
}

export type TLocationState = {
  from?: {
    pathname: string;
  };
  background?: TLocation;
};

export type TLocation = {
  pathname: string;
  state: TLocationState;
  search: string;
  hash: string;
  key?: string;
};

export type TDataProfile = {
  user: TUserForm;
  message: string;
}

export type TUserForm = {
  name?: string | undefined;
  email?: string | undefined;
  password?: string | undefined;
}

export type TForm = {
  name: string;
  email: string;
  password: string;
}

export type TAuth = {
  success: boolean;
  refreshToken: string;
  accessToken: string;
}

export type TOrderFeed = {
  orders: TOrder[];
  total: number;
  totalToday: number;
}

export type TOrder = {
  ingredients: string[];
  _id: string;
  status: string;
  number: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export type TError = {
  success?: boolean,
  message?: string;
  type?: string;
  code?: number;
}

export type TWsActions = {
  wsInit: typeof WS_CONNECTION_START, 
  onOpen: typeof WS_CONNECTION_SUCCESS, 
  onClose: typeof WS_CONNECTION_CLOSED, 
  onError: typeof WS_CONNECTION_ERROR, 
  onMessage: typeof WS_GET_ALL_ORDERS | typeof WS_GET_USER_ORDERS
};