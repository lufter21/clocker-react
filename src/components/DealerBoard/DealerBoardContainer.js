import DbDeposit from './DbDeposit';
import DbInvite from './DbInvite';
import DbMailing from './DbMailing';
import { useDispatch, useSelector } from 'react-redux';
import { showDeposit, showMessage } from '../../app/popupSlice';
import { sendWithdrawForm } from '../../app/api';
import { selectUserData } from '../../app/userDataSlice';
import Loader from '../Loader/Loader';

function DealerBoard({
	paymentsData,
	paymentsIsLoading,
	profileIsLoading,
	profileData,
}) {
	const dispatch = useDispatch();
	const userData = useSelector(selectUserData);

	const makeDeposit = function () {
		dispatch(showDeposit());
	};

	const withdraw = (data, form, callback) => {
		dispatch(
			showMessage({
				title: 'Thanks!',
				text: 'We have received a withdrawal request',
			})
		);

		callback();

		// sendWithdrawForm(data)
		// 	.then((result) => {
		// 		callback();

		// 		const res = result || {};

		// 		if (!res.error) {
		// 			dispatch(
		// 				showMessage({
		// 					title: 'Thanks!',
		// 					text: 'We have received a withdrawal request',
		// 				})
		// 			);
		// 		}
		// 	})
		// 	.catch((error) => {
		// 		console.error(new Error(error));
		// 	});
	};

	return (
		<div className="row tile-wrap">
			{profileIsLoading || paymentsIsLoading ? (
				<Loader />
			) : (
				<>
					<div className="col-4">
						<DbDeposit
							profileData={profileData}
							paymentsData={paymentsData}
							deposit={userData.deposit}
							makeDeposit={makeDeposit}
							withdrawDeposit={withdraw}
						/>
					</div>

					<div className="col-4">
						<DbInvite profileData={profileData} />
					</div>

					<div className="col-4">
						<DbMailing profileData={profileData} />
					</div>
				</>
			)}
		</div>
	);
}

export default DealerBoard;
