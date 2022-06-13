import { createSlice } from '@reduxjs/toolkit';

export const commonSlice = createSlice({
	name: 'common',
	initialState: {
		isOpen: false, // Все вопросы "Я могу отказаться от продажи?"
		curr: 'usd',
	},
	reducers: {
		setOpen(state, action) {
			state.isOpen = action.payload;
		},
		setCurr(state, action) {
			state.curr = action.payload;
		},
	},
});

export const { setOpen, setCurr } = commonSlice.actions;

export default commonSlice.reducer;
