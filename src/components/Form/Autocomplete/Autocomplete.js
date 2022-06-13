import { useState } from 'react';
import css from './Autocomplete.module.scss';

const OptItem = function (props) {
	return (
		<li className={css.optionsLi}>
			<button type="button" className={css.optionsBtn} onClick={props.onClick} data-value={props.name}>
				{props.name}
			</button>
		</li>
	);
};

function Autocomplete(props) {
	const [lastValue, setLastValue] = useState(props.input.value);
	const [options, setOptions] = useState([]);

	const optClick = function (e) {
		props.changeValue(props.input.name, e.target.dataset.value);
	};

	if (props.meta.active && lastValue !== props.input.value) {
		setLastValue(props.input.value);

		props.getOptions(props.input.value).then((res) => {
			setOptions(res);
		});
	}

	const optClass = props.meta.active ? css.optionsWrap + ' ' + css.optionsWrap_vis : css.optionsWrap;
	const optionsList = options.map((item) => <OptItem {...item} key={item.id} onClick={optClick} />);

	const lbid = 'ac-din-id-' + props.input.name;

	return (
		<div className={css.autocomplete}>
			<label htmlFor={lbid} type="button" className={css.arr}></label>
			{!props.meta.active && !props.input.value && (
				<label className={css.placeholder}>{props.placeholder}</label>
			)}

			<input {...props.input} className={css.input} id={lbid} />

			{!!options.length && (
				<div className={optClass}>
					<ul className={css.options}>{optionsList}</ul>
				</div>
			)}
		</div>
	);
}

export default Autocomplete;
