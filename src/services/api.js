import { baseUrl } from '../utils/constants';

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
			'Content-Type': 'application/json;charset=utf-8'
		},
    body: JSON.stringify(selectedIngredients)
  }).then(checkResponse).then(checkSuccess)
}
