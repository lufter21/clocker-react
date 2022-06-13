import Lots from './Lots';
import Loader from '../Loader/Loader';

function LotsContainer({ data, isLoading, profileData }) {
	return isLoading ? <Loader /> : (
		<>
			<Lots lots={data} profile={profileData} />

			{!data || data.length === 0 && (
				<p> There are no current auctions </p>
			)}
		</>
	);
}

export default LotsContainer;
