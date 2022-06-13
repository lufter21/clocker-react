import Deals from './Deals';
import More from '../More/More';
import Loader from '../Loader/Loader';
import { useWantToParticipateMutation } from '../../app/services/watchApi';

function DealsContainer({ data, isLoading, subject }) {
	const [wantToParticipate] = useWantToParticipateMutation();

	const participate = function (id) {
		wantToParticipate({ clock: id });
	}

	return isLoading ? <Loader /> : (
		<>
			{!!data && data.length > 0 && (
				<More initCount="6" data={data} btnText="Show all">
					{(result) => <Deals deals={result} subject={subject} participate={participate} />}
				</More>
			)}

			{!data || data.length === 0 && (
				<p>
					{subject === 'plannedTrades' && 'There are no scheduled auctions'}
					{subject === 'winTrades' && 'No winning bids'}
				</p>
			)}
		</>
	);
}

export default DealsContainer;
