import { useDispatch, useSelector } from 'react-redux';
import { setCurr } from '../../app/commonSlice';
import css from './Button.module.scss';

function CurrencyButtons(props) {
	const dispatch = useDispatch();
	const { curr } = useSelector((state) => state.common);
	const othClass = curr === 'uah' ? css.moneyButtons__btn + ' ' + css.active : css.moneyButtons__btn;
	const usdClass = curr === 'usd' ? css.moneyButtons__btn + ' ' + css.active : css.moneyButtons__btn;

	const toggle = function (btnCurr) {
		if (btnCurr !== curr) {
			dispatch(setCurr(btnCurr));
		}
	};

	return (
		<ul className={css.moneyButtons}>
			<li>
				<button
					className={othClass}
					onClick={() => {
						toggle('uah');
					}}
				>
					<span className="mSign">&#8372;</span>
				</button>
			</li>
			<li>
				<button
					className={usdClass}
					onClick={() => {
						toggle('usd');
					}}
				>
					$
				</button>
			</li>
		</ul>
	);
}

export default CurrencyButtons;
