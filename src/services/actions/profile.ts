import { tokenRequest } from '../api';
import { setCookie } from '../../utils/cookie';
import { TAuth } from '../types';

export const AUTH_REQUEST = 'AUTH_REQUEST';
export const AUTH_FAILED = 'AUTH_FAILED';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const TOKEN_SUCCESS = 'TOKEN_SUCCESS';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const SET_USER_SUCCESS = 'SET_USER_SUCCESS';

export const updateToken = () => {
  return function(dispatch: (arg0: { (): (dispatch: (arg0: { type: string; }) => void) => void; (dispatch: any): void; (): (dispatch: (arg0: { type: string; }) => void) => void; }) => void) {
    dispatch(authRequest);
    tokenRequest().then(data => {
      dispatch(tokenSuccess);
      let accessToken = data.accessToken.split('Bearer ')[1];
      setCookie('accessToken', accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
    })
    .catch(e => {
      console.log(e);
      dispatch(authFailed);
    })
  };
}

export const authRequest = () => {
  return function(dispatch: (arg0: { type: string; }) => void) {
    dispatch({
      type: AUTH_REQUEST
    });
  };
}

export const authFailed = () => {
  return function(dispatch: (arg0: { type: string; }) => void) {
    dispatch({
      type: AUTH_FAILED
    });
  };
}

export const registerSuccess = (data: TAuth) => {
  return function(dispatch: (arg0: { type: string; data: TAuth; }) => void) {
    dispatch({
      type: REGISTER_SUCCESS,
			data: data
    });
  };
}

export const loginSuccess = (data: TAuth) => {
  return function(dispatch: (arg0: { type: string; data: TAuth; }) => void) {
		dispatch({
			type: LOGIN_SUCCESS,
			data: data
		});
  };
}

export const logoutSuccess = (data: TAuth) => {
  return function(dispatch: (arg0: { type: string; data: TAuth; }) => void) {
		dispatch({
			type: LOGOUT_SUCCESS,
			data: data
		});
  };
}

export const tokenSuccess = () => {
  return function(dispatch: (arg0: { type: string; }) => void) {
		dispatch({
			type: TOKEN_SUCCESS
		});
  };
}

export const resetPasswordSuccess = (data: TAuth) => {
  return function(dispatch: (arg0: { type: string; data: TAuth; }) => void) {
		dispatch({
			type: RESET_PASSWORD_SUCCESS,
			data: data
		});
  };
}

export const forgotPasswordSuccess = (data: TAuth) => {
  return function(dispatch: (arg0: { type: string; data: TAuth; }) => void) {
		dispatch({
			type: FORGOT_PASSWORD_SUCCESS,
			data: data
		});
  };
}

export const getUserSuccess = (data: TAuth) => {
  return function(dispatch: (arg0: { type: string; data: TAuth; }) => void) {
		dispatch({
			type: LOGIN_SUCCESS,
			data: data
		});
  };
}

export const setUserSuccess = (data: TAuth) => {
  return function(dispatch: (arg0: { type: string; data: TAuth; }) => void) {
		dispatch({
			type: LOGIN_SUCCESS,
			data: data
		});
  };
}
