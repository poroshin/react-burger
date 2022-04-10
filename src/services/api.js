import { urlIngredients, urlOrders } from '../utils/constants';

export const getIngredientsRequest = async () => {
  return await fetch(urlIngredients)
}

export const getOrderRequest = async (selectedIngredients) => {
  return await fetch(urlOrders, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8'
		},
    body: JSON.stringify(selectedIngredients)
  })
}
