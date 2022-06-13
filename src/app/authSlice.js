import { createSlice } from '@reduxjs/toolkit';
import { removeItems } from '../helpers/helpres';

export const authSlice = createSlice({
	name: 'auth',
	initialState: {
		isLogin: false,
		firstLogin: false,
		data: {
			key: null,
			role: null,
			code: null,
			refererId: null,
		},
	},
	reducers: {
		setKey(state, action) {
			state.data.key = action.payload;
		},
		setAuthData(state, action) {
			state.data = action.payload;
		},
		setRefererId(state, action) {
			state.data.refererId = action.payload;
		},
		login(state, { payload: { role, accessToken, refreshToken, firstLogin } }) {
			state.isLogin = true;
			state.firstLogin = !!firstLogin;
			// !!role && localStorage.setItem('role', role);
			state.role = role;
			localStorage.setItem('accessToken', accessToken);
			localStorage.setItem('refreshToken', refreshToken);
		},
		logout(state) {
			state.isLogin = false;
			removeItems(['role', 'accessToken', 'refreshToken']);
		},
	},
});

export const { setAuthData, setKey, login, logout, setRefererId } = authSlice.actions;

export default authSlice.reducer;
