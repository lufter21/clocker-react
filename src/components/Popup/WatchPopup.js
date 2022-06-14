import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetWatchAsCurrentQuery } from '../../app/services/watchApi';
import Loader from '../Loader/Loader';
import './Popup.scss';

function WatchPopup(props) {
	const { data, isLoading } = useGetWatchAsCurrentQuery(props.id);
	const navigation = useNavigate();

	useEffect(function () {
		if (!isLoading && (!data || !data.clock)) {
			props.close();
			navigation('/cabinet');
		}
	}, [isLoading]);

	if (isLoading) {
		return <Loader />;
	} else if (!data || !data.clock) {
		return null;
	}

	return (
		<div className="popup__window popup-watch">
			<div className="popup__inner">
				<button className="js-popup-close popup-close-btn" onClick={props.close}></button>

				<div className="lot-card">
					<div className="lot-card__img">
						<img src={!!data.clock.images && data.clock.images[0].file} alt="img" />
					</div>

					<div className="lot-card__title">{!!data.clock.brand ? data.clock.brand : ''}</div>
					<div className="lot-card__sub-title">{!!data.clock.title ? data.clock.title : ''}</div>
					<div className="lot-card__rows">
						<div className="lot-card__rows-item">
							Current rate: <span className="bold">{props.curr === 'usd' ? `$ ${data.price}` : `${data.priceUah} ₴`}</span>
						</div>
						<div className="lot-card__rows-item">
							Bet Step: <span className="bold">{props.curr === 'usd' ? `$${data.step}` : `${data.stepUah} ₴`}</span>
						</div>
						<div className="lot-card__rows-item c-gray">
							Next bet size: <span className="bold">
								{props.curr === 'usd'
									? `$ ${Math.round(data.price + data.step)}`
									: `${Math.round(data.priceUah + data.stepUah)} ₴`}
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default WatchPopup;