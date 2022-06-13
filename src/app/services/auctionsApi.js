import { createApi } from '@reduxjs/toolkit/query/react';
import { $authHost, $host } from '.';

export const auctionsApi = createApi({
	baseQuery: $host,
	reducerPath: 'auctionsApi',
	tagTypes: ['CurrentAuctions'],
	endpoints: (build) => ({
		getAuctionsHistory: build.query({
			query: () => ({
				url: 'api/get-content.php?id=auctionsHistory',
				params: { limit: 5, offset: 0 },
			}),
		}),
		getDealerAuctionsCurr: build.query({
			query: () => ({
				url: 'api/get-content.php?id=currentAuctions',
				params: { limit: 9999, offset: 0 },
			}),
			providesTags: () => ['CurrentAuctions'],
		}),
		getDealerAuctionsWin: build.query({
			query: () => ({
				url: 'api/get-content.php?id=wonAuctions',
				params: { limit: 9999, offset: 0 },
			}),
		}),
		increase: build.mutation({
			query: (id) => ({
				url: `api/auctions/${id}/increase`,
				method: 'POST',
			}),
			invalidatesTags: ['CurrentAuctions'],
		}),
		autobet: build.mutation({
			query: ({ id, currency, limit }) => ({
				url: `api/auctions/${id}/autobet`,
				method: 'POST',
				body: { limit, currency },
			}),
		}),
	}),
});

export const {
	useGetAuctionsHistoryQuery,
	useGetDealerAuctionsCurrQuery,
	useGetDealerAuctionsWinQuery,
	useIncreaseMutation,
	useAutobetMutation
} = auctionsApi;
