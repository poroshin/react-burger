import { profileReducer } from "./profile";
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

import * as data from '../../utils/test-data';

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

describe('profile reducer', () => {
  it('should return the initial state', () => {
    expect(
      profileReducer(undefined, {})
    ).toEqual(profileInitialState)
  })

  it('should handle AUTH_REQUEST', () => {
    expect(
      profileReducer(profileInitialState, {
        type: AUTH_REQUEST,
      })
    ).toEqual(
      {
        ...profileInitialState,
        isFailed: false,
        isRequested: true
      }
    )
  })

  it('should handle AUTH_FAILED', () => {
    expect(
      profileReducer(profileInitialState, {
        type: AUTH_FAILED,
      })
    ).toEqual(
      {
        ...profileInitialState,
        isResetPassword: false,
        isFailed: true,
        isRequested: false
      }
    )
  })

  it('should handle REGISTER_SUCCESS', () => {
    expect(
      profileReducer({
        ...profileInitialState,

      }, {
        type: REGISTER_SUCCESS,
        data: data.profile,
      })
    ).toEqual(
      {
        ...profileInitialState,
        isLoggedIn: true,
        user: data.user,
        message: 'message',
        isLoaded: true,
        isRequested: false
      }
    )
  })

  it('should handle LOGIN_SUCCESS', () => {
    expect(
      profileReducer({
        ...profileInitialState,

      }, {
        type: LOGIN_SUCCESS,
        data: data.profile,
      })
    ).toEqual(
      {
        ...profileInitialState,
        isLoggedIn: true,
        user: data.user,
        message: 'message',
        isLoaded: true,
        isRequested: false
      }
    )
  })

  it('should handle LOGOUT_SUCCESS', () => {
    expect(
      profileReducer({
        ...profileInitialState,

      }, {
        type: LOGOUT_SUCCESS,
        data: data.profile,
      })
    ).toEqual(
      {
        ...profileInitialState,
        isLoggedIn: false,
        user: {},
        message: 'message',
        isLoaded: true,
        isRequested: false
      }
    )
  })

  it('should handle TOKEN_SUCCESS', () => {
    expect(
      profileReducer({
        ...profileInitialState,

      }, {
        type: TOKEN_SUCCESS,
      })
    ).toEqual(
      {
        ...profileInitialState,
        user: {},
        isLoaded: true,
        isRequested: false
      }
    )
  })

  it('should handle RESET_PASSWORD_SUCCESS', () => {
    expect(
      profileReducer({
        ...profileInitialState,

      }, {
        type: RESET_PASSWORD_SUCCESS,
        data: data.profile,
      })
    ).toEqual(
      {
        ...profileInitialState,
        message: 'message',
        isLoaded: true,
        isRequested: false
      }
    )
  })

  it('should handle FORGOT_PASSWORD_SUCCESS', () => {
    expect(
      profileReducer({
        ...profileInitialState,

      }, {
        type: FORGOT_PASSWORD_SUCCESS,
        data: data.profile,
      })
    ).toEqual(
      {
        ...profileInitialState,
        message: 'message',
        isResetPassword: true,
        isLoaded: true,
        isRequested: false
      }
    )
  })

  it('should handle GET_USER_SUCCESS', () => {
    expect(
      profileReducer({
        ...profileInitialState,

      }, {
        type: GET_USER_SUCCESS,
        data: data.profile,
      })
    ).toEqual(
      {
        ...profileInitialState,
        isLoggedIn: true,
        user: data.user,
        isLoaded: true,
        isRequested: false
      }
    )
  })

  it('should handle SET_USER_SUCCESS', () => {
    expect(
      profileReducer({
        ...profileInitialState,

      }, {
        type: SET_USER_SUCCESS,
        data: data.profile,
      })
    ).toEqual(
      {
        ...profileInitialState,
        user: data.user,
        isLoaded: true,
        isRequested: false
      }
    )
  })
})