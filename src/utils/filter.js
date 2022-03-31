export const filterBun = (data) => {
	return data.filter(i => i.type === 'bun');
}

export const filterSauce = (data) => {
	return data.filter(i => i.type === 'sauce');
}

export const filterMain = (data) => {
	return data.filter(i => i.type === 'main');
}

export const filterNotBun = (data) => {
	return data.filter(i => i.type !== 'bun');
}
