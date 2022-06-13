import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setOpen } from '../../app/commonSlice';
import css from './Button.module.scss';

function BorderButton(props) {
	const dispatch = useDispatch();
	const onClick = () => {
		if (props.link === '/') {
			dispatch(setOpen(true));
		}
	};

	return (
		<Link to={props.link} className={css.borderBtn} onClick={onClick}>
			{props.name}
			<span className={css.borderBtn__btn}></span>
		</Link>
	);
}

export default BorderButton;
