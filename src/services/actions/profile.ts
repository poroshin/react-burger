import { 
  tokenRequest, 
  registerRequest, 
  loginRequest, 
  logoutRequest, 
  getUserRequest, 
  setUserRequest, 
  forgotPasswordRequest, 
  resetPasswordRequest
} from '../api';
import { setCookie, deleteCookie } from '../../utils/cookie';
import { AppDispatch, AppThunk, TDataProfile } from '../types';

import {
  AUTH_REQUEST,
  AUTH_FAILED,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  TOKEN_SUCCESS,
	RESET_PASSWORD_SUCCESS,
	FORGOT_PASSWORD_SUCCESS,
  GET_USER_SUCCESS,
  SET_USER_SUCCESS,
} from '../constants';

export interface IAuthRequestAction {
  readonly type: typeof AUTH_REQUEST;
}

export interface IAuthFailedAction {
  readonly type: typeof AUTH_FAILED;
}

export interface IRegisterSuccessAction {
  readonly type: typeof REGISTER_SUCCESS;
  data: TDataProfile;
}

export interface ILoginSuccessAction {
  readonly type: typeof LOGIN_SUCCESS;
  data: TDataProfile;
}

export interface ILogoutSuccessAction {
  readonly type: typeof LOGOUT_SUCCESS;
  data: TDataProfile;
}

export interface ITokenSuccessAction {
  readonly type: typeof TOKEN_SUCCESS;
}

export interface IResetPasswordSuccessAction {
  readonly type: typeof RESET_PASSWORD_SUCCESS;
  data: TDataProfile;
}

export interface IForgotPasswordSuccessAction {
  readonly type: typeof FORGOT_PASSWORD_SUCCESS;
  data: TDataProfile;
}

export interface IGetUserSuccessAction {
  readonly type: typeof GET_USER_SUCCESS;
  data: TDataProfile;
}

export interface ISetUserSuccessAction {
  readonly type: typeof SET_USER_SUCCESS;
  data: TDataProfile;
}

export type TProfileActions = 
	| IAuthRequestAction
  | IAuthFailedAction
  | IRegisterSuccessAction
  | ILoginSuccessAction
  | ILogoutSuccessAction
	| ITokenSuccessAction
  | IResetPasswordSuccessAction
  | IForgotPasswordSuccessAction
  | IGetUserSuccessAction
  | ISetUserSuccessAction;

export const updateToken: AppThunk = () => {
  return function(dispatch: AppDispatch) {
    dispatch(authRequest());
    tokenRequest().then(data => {
      dispatch(tokenSuccess());
      let accessToken = data.accessToken.split('Bearer ')[1];
      setCookie('accessToken', accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
    })
    .catch((e: number | string | null) => {
      console.log(e);
      dispatch(authFailed());
    })
  };
}

export const setLogout: AppThunk = (history) => {
  return function(dispatch: AppDispatch) {
    dispatch(authRequest());
    logoutRequest().then(data => {
      dispatch(logoutSuccess(data));
      deleteCookie('accessToken');
      localStorage.removeItem('refreshToken');
      history.replace({ pathname: '/login' });
    })
    .catch((e: number | string | null) => {
      console.log(e);
      dispatch(authFailed());
    })
  };
}

export const forgotPasswordThunk: AppThunk = (form, history) => {
  return function(dispatch: AppDispatch) {
    dispatch(authRequest());
    forgotPasswordRequest(form).then(data => {
      dispatch(forgotPasswordSuccess(data));
      history.replace({ pathname: '/reset-password' });
    })
    .catch((e: number | string | null) => {
      console.log(e);
      dispatch(authFailed());
    })
  };
}

export const resetPasswordThunk: AppThunk = (form, history) => {
  return function(dispatch: AppDispatch) {
    dispatch(authRequest());
    resetPasswordRequest(form).then(data => {
      dispatch(resetPasswordSuccess(data));
      history.replace({ pathname: '/profile' });
    })
    .catch((e: number | string | null) => {
      console.log(e);
      dispatch(authFailed());
    })
  };
}

export const authorizationThunk: AppThunk = () => {
  return function(dispatch: AppDispatch) {
    dispatch(authRequest());
    getUserRequest().then(data => {
      dispatch(getUserSuccess(data));
    })
    .catch((e: number | string | null) => {
      if (e == 403) {
        dispatch(authRequest());
        tokenRequest().then(data => {
          dispatch(tokenSuccess());
          let accessToken = data.accessToken.split('Bearer ')[1];
          setCookie('accessToken', accessToken);
          localStorage.setItem('refreshToken', data.refreshToken);

          dispatch(authRequest());
          getUserRequest().then(data => {
            dispatch(getUserSuccess(data));
          })
        })
        .catch((e: number | string | null) => {
          console.log(e);
          dispatch(authFailed());
        })
      } else {
        console.log(e);
        dispatch(authFailed());
      }
    })
  };
}

export const setUserThunk: AppThunk = (form) => {
  return function(dispatch: AppDispatch) {
    dispatch(authRequest());
    setUserRequest(form).then(data => {
      dispatch(setUserSuccess(data));
    })
    .catch((e: number | string | null) => {
      if (e == 403) {
        dispatch(authRequest());
        tokenRequest().then(data => {
          dispatch(tokenSuccess());
          let accessToken = data.accessToken.split('Bearer ')[1];
          setCookie('accessToken', accessToken);
          localStorage.setItem('refreshToken', data.refreshToken);

          dispatch(authRequest());
          setUserRequest(form).then(data => {
            dispatch(setUserSuccess(data));
          })
        })
        .catch((e: number | string | null) => {
          console.log(e);
          dispatch(authFailed());
        })
      } else {
        console.log(e);
        dispatch(authFailed());
      }
    })
  };
}

export const loginThunk: AppThunk = (form, history) => {
  return function(dispatch: AppDispatch) {
    dispatch(authRequest());
    loginRequest(form).then(data => {
      dispatch(loginSuccess(data));
      let accessToken = data.accessToken.split('Bearer ')[1];
      setCookie('accessToken', accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      history.replace({ pathname: '/' });
    })
    .catch((e: number | string | null) => {
      console.log(e);
      dispatch(authFailed());
    })
  };
}

export const registerThunk: AppThunk = (form, history) => {
  return function(dispatch: AppDispatch) {
    dispatch(authRequest());
    registerRequest(form).then(data => {
      dispatch(registerSuccess(data));
      let accessToken = data.accessToken.split('Bearer ')[1];
      setCookie('accessToken', accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      history.replace({ pathname: '/profile' });
    })
    .catch((e: number | string | null) => {
      console.log(e);
      dispatch(authFailed());
    })
  };
}

export const authRequest = (): IAuthRequestAction => ({
  type: AUTH_REQUEST
})

export const authFailed = (): IAuthFailedAction => ({
  type: AUTH_FAILED
})

export const registerSuccess = (data: TDataProfile): IRegisterSuccessAction => ({
  type: REGISTER_SUCCESS,
  data: data
})

export const loginSuccess = (data: TDataProfile): ILoginSuccessAction => ({
  type: LOGIN_SUCCESS,
  data: data
})

export const logoutSuccess = (data: TDataProfile): ILogoutSuccessAction => ({
  type: LOGOUT_SUCCESS,
  data: data
})

export const tokenSuccess = (): ITokenSuccessAction => ({
  type: TOKEN_SUCCESS
})

export const resetPasswordSuccess = (data: TDataProfile): IResetPasswordSuccessAction => ({
  type: RESET_PASSWORD_SUCCESS,
  data: data
})

export const forgotPasswordSuccess = (data: TDataProfile): IForgotPasswordSuccessAction => ({
  type: FORGOT_PASSWORD_SUCCESS,
  data: data
})

export const getUserSuccess = (data: TDataProfile): IGetUserSuccessAction => ({
  type: GET_USER_SUCCESS,
  data: data
})

export const setUserSuccess = (data: TDataProfile): ISetUserSuccessAction => ({
  type: SET_USER_SUCCESS,
  data: data
})
