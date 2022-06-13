import './Reviews.scss';
import { useGetReviewsQuery } from '../../app/services/reviewsApi';
import Loader from '../Loader/Loader';

function Item({ name, text, clock }) {
	return (
		<div className="col-4">
			<div className="reviews__item">
				<div className="reviews__title">{name}</div>
				<div className="reviews__txt">{text}</div>
			</div>
		</div>
	);
}

function Reviews() {
	const { data, isLoading } = useGetReviewsQuery();
	const items = data ? data.map((item, i) => <Item {...item} key={i} />) : [];

	return isLoading ? <Loader /> : (
		<>
		{items.length > 0 &&
			<div className="row row_gap60">{items}</div>
		}

		{items.length === 0 &&
			<div className="ta-c">No reviews left yet</div>
		}
		</>
	);
}

export default Reviews;
