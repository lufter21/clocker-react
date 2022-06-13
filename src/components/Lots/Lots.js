import LotCard from './LotCard';

function Lots(props) {
	let lots = [];

	if (props.lots) {
		lots = props.lots.map(function (item, i) {
			return (
				<div className="col-4" key={item.id || i}>
					<LotCard item={item} profile={props.profile} />
				</div>
			);
		});
	}

	return <div className="row row_gap60 deals">{lots}</div>;
}

export default Lots;
