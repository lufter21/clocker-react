import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { makeDepositApi, updateUserDataApi, userAuthApi } from './api';

export const userAuth = createAsyncThunk('user/userAuthApi', async (data) => await userAuthApi(data));

export const makeDeposit = createAsyncThunk(
	'user/makeDepositApi',
	async (data) => await makeDepositApi(data)
);

export const updateUserData = createAsyncThunk(
	'user/updateUserDataApi',
	async (data) => await updateUserDataApi(data)
);

export const userDataSlice = createSlice({
	name: 'user',
	initialState: {
		login: false,
		data: {
			id: null,
			role: '',
			city: 'Lviv',
			name: '',
			deposit: {
				uah: 0,
				usd: 0,
			},
			settings: {
				notification: [],
			},
		},
	},
	reducers: {
		logOut: function (state, action) {
			state.login = false;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(userAuth.fulfilled, (state, action) => {
			if (action.payload && !action.payload.error) {
				state.login = true;
				state.data = action.payload;
			}
		});

		builder.addCase(updateUserData.fulfilled, (state, action) => {
			if (action.payload && !action.payload.error) {
				state.data = action.payload;
			}
		});

		builder.addCase(makeDeposit.fulfilled, (state, action) => {
			if (action.payload && !action.payload.error) {
				state.data.deposit = action.payload;
			}
		});
	},
});

export const isUserLogin = (state) => state.user.login;
export const selectUserData = (state) => state.user.data;

export const { logOut } = userDataSlice.actions;

export default userDataSlice.reducer;
