import Main from '../components/Main/Main';
import Section from '../components/Section/Section';
import DealerBoard from '../components/DealerBoard/DealerBoardContainer';
import DealsContainer from '../components/Deals/DealsContainer';
import LotsContainer from '../components/Lots/LotsContainer';
import FloatMenu from '../components/FloatMenu/FloatMenu';
import { useDispatch } from 'react-redux';
import { showDeposit, showWatch } from '../app/popupSlice';
import { useNavigate } from 'react-router';
import { logout } from '../app/authSlice';
import { useGetDealerAuctionsCurrQuery, useGetDealerAuctionsWinQuery } from '../app/services/auctionsApi';
import { useGetDealerAuctionsUpcomingQuery } from '../app/services/watchApi';
import { useGetProfileQuery } from '../app/services/usersApi';
import { useGetShowPaymentsQuery } from '../app/services/paymentsApi';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

function DealerCabinetPage() {
	const dispatch = useDispatch();
	const nav = useNavigate();
	const { watchId } = useParams();

	useEffect(function () {
		if (!!watchId) {
			dispatch(showWatch({ data: { id: watchId } }));
		}
	}, [watchId]);

	const showPro = () => {
		dispatch(showDeposit());
	};

	const onLogout = () => {
		dispatch(logout());
		nav('/');
	};

	const { data: currentData, isLoading: currentIsLoading, isSuccess } = useGetDealerAuctionsCurrQuery(/* '', {
		pollingInterval: 3000,
	} */);
	
	let newCurrent = [];

	if (isSuccess && currentData) {
		newCurrent = [...currentData];
		newCurrent.sort((a, b) => a.tradeStartsAt - b.tradeStartsAt);
	}

	const { data: upcomingData, isLoading: upcomigIsLoading } = useGetDealerAuctionsUpcomingQuery(/* '', {
		pollingInterval: 3000,
	} */);
	const { data: winData, isLoading: winIsloading } = useGetDealerAuctionsWinQuery(/* '', {
		pollingInterval: 3000,
	} */);
	const { data: profileData, isLoading: profileIsLoading } = useGetProfileQuery(/* '', {
		pollingInterval: 3000,
	} */);
	
	// const { data: paymentsData, isLoading: paymentsIsLoading } = useGetShowPaymentsQuery();
	const paymentsData = {
		show: true
	};
	const paymentsIsLoading = false;

	return (
		<Main>
			<div className="top-bar">
				<div className="row">
					{/* {!!profileData && (
						<div className="col sm-col-6 col_right">
							<button className="sm-btn" onClick={showPro}>
								Demo
							</button>
						</div>
					)} */}
					{!!profileData && (
						<div className={`col sm-col-6 col_right ${!!profileData.status ? 'col_right' : ''}`}>
							<button className="sm-btn" onClick={onLogout}>
								Logout
							</button>
						</div>
					)}
				</div>
			</div>

			<Section>
				<div className="wrp">
					<DealerBoard
						paymentsData={paymentsData}
						paymentsIsLoading={paymentsIsLoading}
						profileData={profileData}
						profileIsLoading={profileIsLoading}
					/>
				</div>
			</Section>

			<FloatMenu
				items={[
					{
						name: 'Upcoming trades',
						anchor: 'planned-trades',
					},
					{
						name: 'Current deals',
						anchor: 'current-deals',
					},
					{
						name: 'Won trades',
						anchor: 'win-trades',
					},
				]}
			/>

			<Section id="planned-trades" title="Upcoming trades">
				<div className="wrp">
					<DealsContainer subject="plannedTrades" data={upcomingData} isLoading={upcomigIsLoading} />
				</div>
			</Section>

			<Section id="current-deals" title="Current deals">
				<div className="wrp">
					<LotsContainer data={newCurrent} profileData={profileData} isLoading={currentIsLoading} />
				</div>
			</Section>

			<Section id="win-trades" title="Won trades">
				<div className="wrp">
					<DealsContainer subject="winTrades" data={winData} isLoading={winIsloading} />
				</div>
			</Section>
		</Main>
	);
}

export default DealerCabinetPage;
