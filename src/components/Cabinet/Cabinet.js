import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DealerCabinetPage from '../../pages/dealer-cabinet';
import SellerCabinetPage from '../../pages/seller-cabinet';

function Cabinet(props) {
	// const role = Number(localStorage.getItem('role'));
	const { role } = useSelector((state) => state.auth);
	const navigation = useNavigate();

	useEffect(function() {
		if (role === 1 && props.isWatchRoute) {
			navigation('/cabinet');
		}
	}, []);

	if (role === 1) return <DealerCabinetPage />;
	if (role === 2) return <SellerCabinetPage />;
}

export default Cabinet;