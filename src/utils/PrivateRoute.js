import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { showAuth } from '../app/popupSlice';

export const PrivateRoute = () => {
	const dispatch = useDispatch();
	const { isLogin } = useSelector((state) => state.auth);

	if (isLogin) {
		return <Outlet />;
	} else {
		dispatch(showAuth());
		return <Navigate to="/" />;
	}
};
