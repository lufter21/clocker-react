import { createApi } from '@reduxjs/toolkit/query/react';
import { $authHost, $host } from '.';

export const notificationApi = createApi({
	baseQuery: $host,
	reducerPath: 'notificationApi',
	endpoints: (build) => ({
		updateNotification: build.mutation({
			query: (body) => ({
				url: 'api/notifications/',
				method: 'PATCH',
				body,
			}),
		}),
	}),
});

export const { useUpdateNotificationMutation } = notificationApi;
