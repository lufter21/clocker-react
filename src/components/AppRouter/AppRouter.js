import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { PrivateRoute } from '../../utils/PrivateRoute';
import { getUrlparam } from '../../helpers/helpres';
import { login, logout, setRefererId } from '../../app/authSlice';
import { useAuthRefreshMutation } from '../../app/services/authApi';

import Header from '../Header/Header';
import HomePage from '../../pages/home';
import ReviewsPage from '../../pages/reviews';
import InvestorsPage from '../../pages/investors';
import Popup from '../Popup/PopupContainer';
import Footer from '../Footer/Footer';
import RequiredDocumentsPage from '../../pages/required-documents';
import OnlineAssessmentPage from '../../pages/online-assessment';
import GeneralTermsPage from '../../pages/general-terms';
import BrandsPage from '../../pages/brands';
import DontRedeemPage from '../../pages/dont-redeem';
import ForDealersPage from '../../pages/for-dealers';
import ContactsPage from '../../pages/contacts';
import Cabinet from '../Cabinet/Cabinet';
import Page404 from '../../pages/page404';
import Loader from '../Loader/Loader';

const ScrollTop = () => {
	const { pathname } = useLocation();

	useEffect(() => {
		if (!pathname.includes('/cabinet/watch')) {
			window.scrollTo(0, 0);
		}
	}, [pathname]);

	return null;
};

export default function AppRouter() {
	const navigation = useNavigate();
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(false);
	const [refresh] = useAuthRefreshMutation();

	// const onRefresh = async (refreshToken) => {
	// 	try {
	// 		const { data } = await refresh({ refreshToken });
	// 		dispatch(login(data));
	// 	} catch (error) {
	// 		console.error(new Error(error));
	// 		dispatch(logout());
	// 	}
	// };

	// const setReferer = () => {
	// 	const refererId = Number(getUrlparam('refered_id'));
	// 	if (!!refererId) {
	// 		dispatch(setRefererId(refererId));
	// 		navigation('/for-dealers');
	// 	}
	// };

	// useEffect(() => {
	// 	const refreshToken = localStorage.getItem('refreshToken');

	// 	if (!!refreshToken) {
	// 		const promise = new Promise((resolve) => {
	// 			setTimeout(() => {
	// 				resolve(onRefresh(refreshToken));
	// 			}, 1000);
	// 		});
	// 		promise.then(() => {
	// 			setIsLoading(false);
	// 		});
	// 	} else {
	// 		setIsLoading(false);
	// 	}

	// 	setReferer();
	// }, []);

	return isLoading ? (
		<Loader />
	) : (
		<>
			<Header />

			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/about/reviews" element={<ReviewsPage />} />
				<Route path="/about/investors" element={<InvestorsPage />} />
				<Route path="/how-it-works/required-documents" element={<RequiredDocumentsPage />} />
				<Route path="/how-it-works/online-assessment" element={<OnlineAssessmentPage />} />
				<Route path="/what-we-buying/general-terms" element={<GeneralTermsPage />} />
				<Route path="/what-we-buying/brands" element={<BrandsPage />} />
				<Route path="/what-we-buying/dont-redeem" element={<DontRedeemPage />} />
				<Route path="/for-dealers" element={<ForDealersPage />} />
				<Route path="/contacts" element={<ContactsPage />} />
				<Route path="/cabinet" element={<PrivateRoute />}>
					<Route path="watch/:watchId" element={<Cabinet isWatchRoute={true} />} />
					<Route index element={<Cabinet />} />
				</Route>
				<Route path="*" element={<Page404 />} />
			</Routes>

			<Footer />
			<Popup />

			<ScrollTop />
		</>
	);
}
