import { baseUrl } from '../utils/constants';
import { getCookie } from '../utils/cookie';

export const checkResponse = (res) => {
  if(res.ok){
    return res.json();
  }else{
    return Promise.reject(`Ошибка ${res.status}`);
  }
}

export const checkSuccess = (res) => {
  if(res.success){
    return res;
  }else{
    return Promise.reject(`!response.success`);
  }
}

export const getIngredientsRequest = async () => {
  return await fetch(`${baseUrl}/ingredients`).then(checkResponse).then(checkSuccess)
}

export const getOrderRequest = async (selectedIngredients) => {
  return await fetch(`${baseUrl}/orders`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
      Authorization: 'Bearer ' + getCookie('token')
		},
    body: JSON.stringify(selectedIngredients)
  }).then(checkResponse).then(checkSuccess)
}

export const registerRequest = async (form) => {
  return await fetch(`${baseUrl}/auth/register`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8'
		},
    body: JSON.stringify(form)
  }).then(checkResponse).then(checkSuccess)
}

export const loginRequest = async (form) => {
  return await fetch(`${baseUrl}/auth/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8'
		},
    body: JSON.stringify(form)
  }).then(checkResponse).then(checkSuccess)
}

export const logoutRequest = async () => {
  const token = localStorage.getItem('refreshToken');
  return await fetch(`${baseUrl}/auth/logout`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8'
		},
    body: JSON.stringify({ token })
  }).then(checkResponse).then(checkSuccess)
}

export const tokenRequest = async (form) => {
  const token = localStorage.getItem('refreshToken');
  return await fetch(`${baseUrl}/auth/token`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8'
		},
    body: JSON.stringify({ token })
  }).then(checkResponse).then(checkSuccess)
}

export const forgotPasswordRequest = async (form) => {
  return await fetch(`${baseUrl}/password-reset`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
      Authorization: 'Bearer ' + getCookie('token')
		},
    body: JSON.stringify(form)
  }).then(checkResponse).then(checkSuccess)
}

export const resetPasswordRequest = async (form) => {
  return await fetch(`${baseUrl}/password-reset/reset`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
      Authorization: 'Bearer ' + getCookie('token')
		},
    body: JSON.stringify(form)
  }).then(checkResponse).then(checkSuccess)
}

export const getUserRequest = async () => {
  return await fetch(`${baseUrl}/auth/user`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
      Authorization: 'Bearer ' + getCookie('token')
		}
  }).then(checkResponse).then(checkSuccess)
}

export const setUserRequest = async (form) => {
  return await fetch(`${baseUrl}/auth/user`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
      Authorization: 'Bearer ' + getCookie('token')
		},
    body: JSON.stringify(form)
  }).then(checkResponse).then(checkSuccess)
}
