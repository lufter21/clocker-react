import { createApi } from '@reduxjs/toolkit/query/react';
import { $host } from '.';

export const reviewsApi = createApi({
	baseQuery: $host,
	reducerPath: 'reviewsApi',
	tagTypes: ['Review'],
	endpoints: (build) => ({
		getReviews: build.query({
			query: () => ({
				url: 'api/get-reviews.php',
			}),
			providesTags: ['Review'],
		}),
		addReview: build.mutation({
			query: (body) => {
				return {
					url: 'api/add-review.php',
					method: 'POST',
					body,
				};
			},
			invalidatesTags: ['Review'],
		}),
	}),
});

export const { useGetReviewsQuery, useAddReviewMutation } = reviewsApi;
