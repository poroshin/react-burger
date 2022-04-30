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

export const authRequest = () => {
  return function(dispatch) {
    dispatch({
      type: AUTH_REQUEST
    });
  };
}

export const authFailed = () => {
  return function(dispatch) {
    dispatch({
      type: AUTH_FAILED
    });
  };
}

export const registerSuccess = (data) => {
  return function(dispatch) {
    dispatch({
      type: REGISTER_SUCCESS,
			data: data
    });
  };
}

export const loginSuccess = (data) => {
  return function(dispatch) {
		dispatch({
			type: LOGIN_SUCCESS,
			data: data
		});
  };
}

export const logoutSuccess = (data) => {
  return function(dispatch) {
		dispatch({
			type: LOGOUT_SUCCESS,
			data: data
		});
  };
}

export const tokenSuccess = (data) => {
  return function(dispatch) {
		dispatch({
			type: TOKEN_SUCCESS,
			data: data
		});
  };
}

export const resetPasswordSuccess = (data) => {
  return function(dispatch) {
		dispatch({
			type: RESET_PASSWORD_SUCCESS,
			data: data
		});
  };
}

export const forgotPasswordSuccess = (data) => {
  return function(dispatch) {
		dispatch({
			type: FORGOT_PASSWORD_SUCCESS,
			data: data
		});
  };
}

export const getUserSuccess = (data) => {
  return function(dispatch) {
		dispatch({
			type: LOGIN_SUCCESS,
			data: data
		});
  };
}

export const setUserSuccess = (data) => {
  return function(dispatch) {
		dispatch({
			type: LOGIN_SUCCESS,
			data: data
		});
  };
}
