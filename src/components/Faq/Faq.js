import { useGetContentQuery } from '../../app/services/contentApi';
import Loader from '../Loader/Loader';

function Faq(props) {
	const { data, isLoading } = useGetContentQuery(props.path);

	return isLoading ? <Loader /> : (props.component && props.component(data)) || props.children(data);
}

export default Faq;
