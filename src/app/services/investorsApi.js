import { createApi } from '@reduxjs/toolkit/query/react';
import { $host } from '.';

export const investorsApi = createApi({
	baseQuery: $host,
	reducerPath: 'investorsApi',
	endpoints: (build) => ({
		addInvestors: build.mutation({
			query: (body) => ({
				url: 'api/callback.php',
				method: 'POST',
				body,
			}),
		}),
	}),
});

export const { useAddInvestorsMutation } = investorsApi;
