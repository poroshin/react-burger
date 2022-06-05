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

export const getOrderStatus = (status: string) => {
	return status === "created"
		? "Создан"
		: status === "pending"
		? "Готовится"
		: status === "done"
		? "Выполнен"
		: "";
}

export const getOrderStatusStyle = (status: string) => {
	return status === "created"
		? { color: "#ffffff" }
		: status === "pending"
		? { color: "#19c4b5" }
		: status === "done"
		? { color: "#ffffff" }
		: { color: "#ffffff" };
}

export const sayDate = (date: string): string => {
	const orderDate = new Date(date).setHours(0, 0, 0, 0);
	const currentDate = new Date().setHours(0, 0, 0, 0);
	let day = new Date(orderDate).toLocaleDateString("ru-RU", {});
	if (orderDate === currentDate) {
		day = "Сегодня";
	} else if (currentDate - orderDate == 24 * 60 * 60 * 1000) {
		day = "Вчера";
	} else if (currentDate - orderDate == -24 * 60 * 60 * 1000) {
		day = "Завтра";
	}
	const time = new Date(date).toLocaleTimeString("ru-Ru", {
		hour: "2-digit",
		minute: "2-digit",
		timeZoneName: "short",
	});
	return `${day}, ${time}`;
};
