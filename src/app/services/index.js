import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const $host = fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL });

const $authHost = fetchBaseQuery({
	baseUrl: process.env.REACT_APP_API_URL,
	prepareHeaders: (headers) => {
		let token = localStorage.getItem('accessToken');
		if (token) {
			headers.set('Authorization', `JWT ${token}`);
		}
		return headers;
	},
});

export { $host, $authHost };
