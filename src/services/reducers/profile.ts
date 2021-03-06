import { TUserForm } from '../types';
import { TProfileActions } from '../actions/profile';
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

export type TProfileState = {
	isLoaded: boolean;
	isFailed: boolean;
	isRequested: boolean;
	isLoggedIn: boolean;
	isResetPassword: boolean;
  user: TUserForm;
	token: string;
	message: string;
};

const profileInitialState = {
	isLoaded: false,
	isFailed: false,
	isRequested: false,
  isLoggedIn: false,
  isResetPassword: false,
	user: {},
  token: '',
	message: ''
};

export const profileReducer = (state: TProfileState = profileInitialState, action: TProfileActions): TProfileState => {
  switch (action.type) {
    case AUTH_REQUEST: {
      return {
        ...state,
        isFailed: false,
        isRequested: true
      };
    }
    case AUTH_FAILED: {
      return {
        ...state,
        isResetPassword: false,
        isFailed: true,
        isRequested: false
      };
    }
    case REGISTER_SUCCESS: {
      return {
        ...state,
        isLoggedIn: true,
        user: action.data.user,
        message: action.data.message,
        isLoaded: true,
        isRequested: false
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        isLoggedIn: true,
        user: action.data.user,
        message: action.data.message,
        isLoaded: true,
        isRequested: false
      };
    }
    case LOGOUT_SUCCESS: {
      return {
        ...state,
				user: {},
        isLoggedIn: false,
        message: action.data.message,
        isLoaded: true,
        isRequested: false
      };
    }
    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        message: action.data.message,
        isResetPassword: false,
        isLoaded: true,
        isRequested: false
      };
    }
    case FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        message: action.data.message,
        isResetPassword: true,
        isLoaded: true,
        isRequested: false
      };
    }
    case TOKEN_SUCCESS: {
      return {
        ...state,
				user: {},
        isLoaded: true,
        isRequested: false
			};
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        user: action.data.user,
        isLoggedIn: true,
        isLoaded: true,
        isRequested: false
      };
    }
    case SET_USER_SUCCESS: {
      return {
        ...state,
        user: action.data.user,
        isLoaded: true,
        isRequested: false
      };
    }
    default: {
      return state;
    }
  }
};