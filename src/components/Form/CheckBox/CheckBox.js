import css from './CheckBox.module.scss';

function CheckBox(props) {
	return (
		<label className={css.CheckBox}>
			<input {...props.input} className={css.CheckBox__input} />
			<span className={css.CheckBox__button}></span>
			<span className={css.CheckBox__label}>{props.label}</span>
		</label>
	);
}

export default CheckBox;
