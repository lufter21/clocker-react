import { createApi } from '@reduxjs/toolkit/query/react';
import { $host } from '.';

export const usersApi = createApi({
	baseQuery: $host,
	reducerPath: 'usersApi',
	endpoints: (build) => ({
		getCities: build.query({
			query: () => ({
				url: 'api/get-content.php?id=cities',
			}),
		}),
		getProfile: build.query({
			query: () => ({
				url: 'api/get-content.php?id=profile',
			}),
		}),
	}),
});

export const { useGetCitiesQuery, useGetProfileQuery } = usersApi;
