import { createApi } from '@reduxjs/toolkit/query/react';
import { $host } from '.';

export const authApi = createApi({
	baseQuery: $host,
	reducerPath: 'authApi',
	endpoints: (build) => ({
		authSend: build.mutation({
			query: (body) => ({
				url: 'api/auth/sms/send',
				method: 'POST',
				body,
			}),
		}),
		authSms: build.mutation({
			query: (body) => ({
				url: 'api/auth/sms/',
				method: 'POST',
				body,
			}),
		}),
		authRefresh: build.mutation({
			query: (body) => ({
				url: 'api/auth/token/refresh/',
				method: 'POST',
				body,
			}),
		}),
	}),
});

export const { useAuthSmsMutation, useAuthSendMutation, useAuthRefreshMutation } = authApi;
