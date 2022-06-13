import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userDataSlice';
import popupReducer from './popupSlice';
import formReducer from './formSlice';
import authReducer from './authSlice';
import commonReducer from './commonSlice';
import { auctionsApi } from './services/auctionsApi';
import { authApi } from './services/authApi';
import { contentApi } from './services/contentApi';
import { investorsApi } from './services/investorsApi';
import { reviewsApi } from './services/reviewsApi';
import { usersApi } from './services/usersApi';
import { watchApi } from './services/watchApi';
import { paymentsApi } from './services/paymentsApi';
import { notificationApi } from './services/notificationApi';
import { documentsApi } from './services/documentsApi';

export const store = configureStore({
	reducer: {
		user: userReducer,
		popup: popupReducer,
		form: formReducer,
		auth: authReducer,
		common: commonReducer,
		[contentApi.reducerPath]: contentApi.reducer,
		[reviewsApi.reducerPath]: reviewsApi.reducer,
		[auctionsApi.reducerPath]: auctionsApi.reducer,
		[watchApi.reducerPath]: watchApi.reducer,
		[investorsApi.reducerPath]: watchApi.reducer,
		[usersApi.reducerPath]: usersApi.reducer,
		[authApi.reducerPath]: authApi.reducer,
		[paymentsApi.reducerPath]: paymentsApi.reducer,
		[notificationApi.reducerPath]: notificationApi.reducer,
		[documentsApi.reducerPath]: documentsApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(
			contentApi.middleware,
			reviewsApi.middleware,
			auctionsApi.middleware,
			watchApi.middleware,
			investorsApi.middleware,
			usersApi.middleware,
			authApi.middleware,
			paymentsApi.middleware,
			notificationApi.middleware,
			documentsApi.middleware
		),
});
