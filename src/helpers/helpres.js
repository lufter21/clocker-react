export const parseToInt = (phone) => phone.replace(/[^0-9]/g, '');

export const parseHTML = (string) => (!!string ? string.replace(/<[^>]*>?/gm, '') : '');

export const getUrlparam = (param) => {
	const urlParams = new URLSearchParams(window.location.search);
	return urlParams.get(param);
};

export const formateDate = (timestamp) => {
	const months = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec',
	];
	let date = new Date(timestamp);

	let day = date.getUTCDate();
	let month = date.getUTCMonth();

	return `${day} ${months[month]}`;
};

export const removeItems = (items) => items.forEach((item) => localStorage.removeItem(item));
