import { TIngredient } from '../services/types';
import { labels } from './constants';

export const dataFilter = (data: Array<TIngredient>, type: string) => {
	return data.filter(i => i.type === type);
}

export const filterNotBun = (data: Array<TIngredient>) => {
	return data.filter(i => i.type !== labels.bun);
}

export const randomData = (data: Array<TIngredient>) => {
	const length = 7;
	const newArray = [];
	for(let i=0; i<length; i++){
		newArray.push(data[Math.floor(Math.random()*data.length)]);
	};
	return newArray;
}
