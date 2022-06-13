import css from './ToggleCheckBox.module.scss';

function ToggleCheckBox(props) {
	return (
		<label className={css.toggle}>
			<span className={css.toggle__label}>{props.label}</span>
			<input {...props.input} className={css.toggle__input} />
			<span className={css.toggle__button}></span>
		</label>
	);
}

export default ToggleCheckBox;
