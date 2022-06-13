import Main from '../components/Main/Main';
import Section from '../components/Section/Section';
import DealsContainer from '../components/Deals/DealsContainer';
import CurrencyButtons from '../components/Button/CurrencyButtons';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { logout } from '../app/authSlice';
import { useGetSellerAuctionsQuery } from '../app/services/watchApi';

function SellerCabinetPage() {
	const dispatch = useDispatch();
	const nav = useNavigate();

	const onLogout = function () {
		dispatch(logout());
		nav('/');
	};

	const { data, isLoading } = useGetSellerAuctionsQuery('', {
		pollingInterval: 3000,
	});

	return (
		<Main>
			<div className="top-bar">
				<div className="row">
					<div className="col col_right sm-col-12">
						<button className="sm-btn" onClick={onLogout}>
							Выйти
						</button>
					</div>
				</div>
			</div>

			<Section>
				<div className="row row_wrp row_col-middle row_nw">
					<div className="col">
						<div className="section__title mb-0">Мои часы</div>
					</div>
					<div className="col col_right">
						<CurrencyButtons />
					</div>
				</div>
				<div className="wrp mt-65">
					<DealsContainer data={data} isLoading={isLoading} subject="sellerBoard" />
				</div>
			</Section>
		</Main>
	);
}

export default SellerCabinetPage;
