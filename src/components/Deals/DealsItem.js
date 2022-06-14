import { useState } from 'react';
import { useSelector } from 'react-redux';

function DealsItem(props) {
	const { curr } = useSelector((state) => state.common);
	const [participate, setParticipate] = useState(false);

	const participateOnClick = function () {
		// props.participate(props.id);
		setParticipate(true);
	}

	return (
		<div className="deals__item">
			<div className="deals__item-date">{props.tradeStartsAt}</div>

			{props.subject === 'winTrades' && (
				<div className="deals__item-label">
					{(props.paymentStatus === 0 && 'Waiting for final price to be set') ||
						(props.paymentStatus === 1 && 'Awaiting payment') ||
						(props.paymentStatus === 2 && 'Deal completed') ||
						(props.paymentStatus === 3 && 'Deal canceled')}
				</div>
			)}

			<div className="deals__item-title">{!!props.clock ? props.clock.brand : props.brand}</div>
			<div className="deals__item-row">
				{(props.status === 0 && 'Starting price:') ||
					(props.status === 1 && 'Current price:') ||
					(props.status === 2 && 'Final price:') ||
					'Final price:'}{' '}
				<span className="bold">
					{props.subject === 'plannedTrades' || props.subject === 'sellerBoard'
						? curr == 'usd'
							? `$ ${props.startPrice}`
							: `${props.startPriceUah} ₴`
						: curr == 'usd'
							? `$ ${props.price}`
							: `${props.priceUah} ₴`}
				</span>
			</div>

			{props.subject === 'plannedTrades' || props.subject === 'winTrades' ? (
				<>
					<div className="deals__item-row">
						Reference: <span className="bold">{!!props.clock ? props.clock.reference : props.reference}</span>
					</div>
					<div className="deals__item-row">
						Documents:{' '}
						<span className="bold">
							{!!props.clock
								? props.clock.documents && props.clock.documents.length
									? 'Yes'
									: 'No'
								: !!props.documents && !!props.documents.length
									? 'Yes'
									: 'No'}
						</span>
					</div>
					<div className="deals__item-row">
						Box:{' '}
						<span className="bold">
							{!!props.clock
								? props.clock.box === 'True'
									? 'Yes'
									: 'No'
								: props.box === 'True'
									? 'Yes'
									: 'No'}
						</span>
					</div>

					{props.subject === 'plannedTrades' &&
					<>
						<div className="deals__item-row deals__item-row_inf">
							Real photo of the watch will be available 15&nbsp;minutes before the start of the auction
						</div>
						<div className="mt-32">
							{participate &&
								<button className="btn" disabled>Expect notification</button>
							}

							{!participate &&
								<button className="btn" onClick={participateOnClick}>Notify me</button>
							}
							
						</div>
					</>
					}
				</>
			) : null}

			{props.subject !== 'plannedTrades' && props.subject !== 'winTrades' && (
				<div className="deals__item-row">
					Auction Status:
					<br />
					<span className="bold">
						{(props.status === 1 && 'Auction not over yet') ||
							(props.status === 2 && 'Completed') ||
							'Waiting to start'}
					</span>
				</div>
			)}

			{props.subject === 'winTrades' && (
				<div className="deals__info">
					<div className="deals__info-title">Authorized center</div>
					<div className="deals__info-row">City, Street, 21/35</div>
					<div className="deals__info-row">+000 555 00 00</div>
					{props.infoVisible && (
						<div className="deals__info-note">You have 3 days to pay from the end of the auction.</div>
					)}
				</div>
			)}
		</div>
	);
}

export default DealsItem;