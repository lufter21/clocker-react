import { createApi } from '@reduxjs/toolkit/query/react';
import { $host } from '.';

export const documentsApi = createApi({
	baseQuery: $host,
	reducerPath: 'documentsApi',
	endpoints: (build) => ({
		getDocuments: build.query({
			query: (path) => ({
				url: path,
			}),
		}),
	}),
});

export const { useGetDocumentsQuery } = documentsApi;
