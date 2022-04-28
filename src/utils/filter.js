
import { labels } from './constants';

export const dataFilter = (data, type) => {
	return data.filter(i => i.type === type);
}

export const filterNotBun = (data) => {
	return data.filter(i => i.type !== labels.bun);
}

export const randomData = (data) => {
	const length = 7;
	const newArray = [];
	for(let i=0; i<length; i++){
		newArray.push(data[Math.floor(Math.random()*data.length)]);
	};
	return newArray;
}
