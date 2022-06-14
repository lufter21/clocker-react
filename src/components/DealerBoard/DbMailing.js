import './DealerBoard.scss';
import css from '../Form/Form.module.scss';
import { Field, Form } from 'react-final-form';
import { useState } from 'react';
import ToggleCheckBox from '../Form/ToggleCheckBox/ToggleCheckBox';
import { useUpdateNotificationMutation } from '../../app/services/notificationApi';
import { useDispatch } from 'react-redux';
import { showBrands, showMessage } from '../../app/popupSlice';
import { useGetBrandsQuery } from '../../app/services/watchApi';
import { useGetProfileQuery } from '../../app/services/usersApi';

function DbMailing(props) {
	const dispatch = useDispatch();
	// const { data, isSuccess, refetch } = useGetProfileQuery();
	const data = props.profileData;
	const isSuccess = true;
	const [updateNotification] = useUpdateNotificationMutation();
	const [hidden, setHidden] = useState(true);
	const toggleHidden = function () {
		setHidden(!hidden);
	};

	const { data: brandsData = [], isSuccess: brandsSuccess } = useGetBrandsQuery({ limit: 9999 });

	const brandsNotifyFiltered = brandsSuccess && isSuccess && data && !!data.notificationSettings ? brandsData.filter(item => data.notificationSettings.brands.includes(item.id)) : [];

	const brandsNotify = brandsNotifyFiltered.map(item => item.title);

	const choseBrands = function () {
		dispatch(showBrands({
			notifyBrands: (data.notificationSettings && data.notificationSettings.brands) || []
		}));
	}

	const btnClName = hidden ? 'dealer-board__top-toggle' : 'dealer-board__top-toggle active';
	const hiddenBlockClName = hidden
		? 'dealer-board__bottom dealer-board-hidden'
		: 'dealer-board__bottom dealer-board-hidden active';

	const onSubmit = async (data, form, callback) => {
		const newData = { ...data };

		// refetch();

		try {
			await updateNotification(newData);

			dispatch(
				showMessage({
					title: 'Thanks!',
					text: 'Settings have been saved',
				})
			);

		} catch (error) {
			dispatch(
				showMessage({
					title: 'Error!',
					text: error,
				})
			);
		}
	};

	return (
		<div className="dealer-board__block">
			<div className="dealer-board__top">
				<button className={btnClName} onClick={toggleHidden}>
					Notifications
				</button>
			</div>

			<div className={hiddenBlockClName}>
				<Form
					onSubmit={onSubmit}
					initialValues={!!data && data.notificationSettings}
					render={(props) => {
						const formClass = props.submitting ? css.form + ' ' + css.form_sending : css.form;

						return (
							<form onSubmit={props.handleSubmit} className={formClass}>
								<div className="mt-32">
									<button type="button" className="dealer-board__brands-btn" onClick={choseBrands}>
										<span className="dealer-board__brands-btn-span">
											Selected brands:
										</span>
										<span className="dealer-board__brands-btn-brands">
											{brandsNotify.length > 0 && brandsNotify.join(', ')}
											{brandsNotify.length === 0 &&
												<span>All brands</span>
											}
										</span>
									</button>
								</div>
								<div className="mt-16">
									<Field
										name="notifyAboutVictory"
										type="checkbox"
										label="Notify me of my won auctions"
										render={(props) => <ToggleCheckBox initialChecked={true} {...props} />}
									/>
								</div>
								<div className="mt-16">
									<Field
										name="notifyAboutAuction"
										type="checkbox"
										label="Notify about new watches participating in the auction"
										render={(props) => <ToggleCheckBox {...props} />}
									/>
								</div>
								<div className={css.form__row}>
									<button type="submit" className={css.form__submit}>
										Submit
									</button>
								</div>
							</form>
						);
					}}
				/>
			</div>
		</div>
	);
}

export default DbMailing;