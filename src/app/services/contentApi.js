import { createApi } from '@reduxjs/toolkit/query/react';
import { $host } from '.';

export const contentApi = createApi({
	baseQuery: $host,
	reducerPath: 'contentApi',
	endpoints: (build) => ({
		getContent: build.query({
			query: (path) => ({
				url: path
			}),
		}),
	}),
});

export const { useGetContentQuery } = contentApi;
