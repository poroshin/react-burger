import { ThunkAction } from "redux-thunk";
import { Action, ActionCreator, Dispatch } from "redux";
import { TRootState } from '../reducers';

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

export type TReducerProfile = {
  type: string;
  data: {
    user: string;
    message: string;
  }
}

export type TProfileUser = {
  isLoaded: boolean;
  isFailed: boolean;
  isRequested: boolean;
  isLoggedIn: boolean;
  isResetPassword: boolean;
  user: string;
  token: string;
  message: string;
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