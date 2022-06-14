import { createApi } from '@reduxjs/toolkit/query/react';
import { $authHost, $host } from '.';

export const watchApi = createApi({
	baseQuery: $host,
	reducerPath: 'watchApi',
	tagTypes: ['WantToParticipate'],
	endpoints: (build) => ({
		getWatchAsCurrent: build.query({
			query: (id) => ({
				url: 'api/clocks/as_current/' + id
			}),
		}),
		getWatches: build.query({
			query: () => ({
				url: 'api/clocks',
				params: { limit: 9999, offset: 0 },
			}),
		}),
		getBrands: build.query({
			query: (params) => ({
				url: 'api/get-brands.php',
				params,
			}),
		}),
		sendToEstimation: build.mutation({
			query: (formData) => ({
				url: 'api/callback.php',
				method: 'POST',
				body: formData,
			}),
		}),
		getSellerAuctions: build.query({
			query: () => ({
				url: 'api/get-content.php?id=upcomingAuctions',
				params: { limit: 9999, offset: 0 },
			}),
		}),
		getDealerAuctionsUpcoming: build.query({
			query: () => ({
				url: 'api/get-content.php?id=upcomingAuctions',
				params: { limit: 9999, offset: 0 },
			}),
			providesTags: ['WantToParticipate'],
		}),
		wantToParticipate: build.mutation({
			query: (body) => {
				return {
					url: 'api/clocks/auction/upcoming/want_to_participate',
					method: 'POST',
					body,
				};
			},
			invalidatesTags: ['WantToParticipate'],
		}),
	}),
});

export const {
	useGetBrandsQuery,
	useSendToEstimationMutation,
	useGetSellerAuctionsQuery,
	useGetDealerAuctionsUpcomingQuery,
	useGetWatchesQuery,
	useWantToParticipateMutation,
	useGetWatchAsCurrentQuery
} = watchApi;
