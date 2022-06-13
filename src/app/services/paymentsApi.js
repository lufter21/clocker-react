import { createApi } from '@reduxjs/toolkit/query/react';
import { $host } from '.';

export const paymentsApi = createApi({
	baseQuery: $host,
	reducerPath: 'paymentsApi',
	endpoints: (build) => ({
		getShowPayments: build.query({
			query: () => ({
				url: 'api/payments/show',
			}),
		}),
	}),
});

export const { useGetShowPaymentsQuery } = paymentsApi;
