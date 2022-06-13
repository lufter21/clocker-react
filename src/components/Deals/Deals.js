import { formateDate } from '../../helpers/helpres';
import './Deals.scss';
import DealsItem from './DealsItem';

function Deals(props) {
	const data = props.deals.map((auction) => {
		return {
			...auction,
			tradeStartsAt: !!auction.tradeStartsAt ? formateDate(auction.tradeStartsAt) : formateDate(auction.date),
		};
	});

	data.sort((a, b) => {
		if (a.tradeStartsAt > b.tradeStartsAt) {
			return 1;
		}
		if (a.tradeStartsAt < b.tradeStartsAt) {
			return -1;
		}
		return 0;
	});

	const modDeals = [...data];

	data.reduce((prev, curr, index) => {
		let res = prev || {};

		if (res.ind === undefined || index % 3 === 0 || curr.tradeStartsAt !== res.tradeStartsAt) {
			res.ind = index;
			res.tradeStartsAt = curr.tradeStartsAt;
		} else if (curr.tradeStartsAt === res.tradeStartsAt) {
			modDeals[res.ind].colspan = modDeals[res.ind].colspan ? modDeals[res.ind].colspan + 1 : 2;
			modDeals[index].colspan = 'hidden';
		} else {
			res.ind = null;
		}

		return res;
	}, {});

	data.reduce((prev, curr, index) => {
		let res = prev || {};

		if (res.ind === undefined || curr.tradeStartsAt !== res.tradeStartsAt) {
			res.ind = index;
			res.tradeStartsAt = curr.tradeStartsAt;
		} else if (curr.tradeStartsAt === res.tradeStartsAt) {
			modDeals[index].hiddenMob = 'true';
		} else {
			res = null;
		}
		return res;
	}, {});

	const resultItems = modDeals ? modDeals.slice(0, props.count) : [];

	let acc;
	const deals = resultItems.map((item, index) => {
		index === 1 && (acc = index);
		index === acc + 3 && (acc = index);

		return (
			<div className="col-4" data-colspan={item.colspan} data-hidden-mob={item.hiddenMob} key={item.id}>
				<DealsItem
					{...item}
					subject={props.subject}
					infoVisible={index !== acc}
					participate={props.participate}
				/>
			</div>
		);
	});

	return <div className="row row_gap60 deals">{deals}</div>;
}

export default Deals;
