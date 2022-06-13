import css from './InputError.module.scss';

function InputError(props) {
	const cssClass =
		(props.meta.error || props.meta.submitError) && props.meta.touched
			? css.errorWrap + ' ' + css.isError
			: css.errorWrap;

	return (
		<div className={cssClass}>
			{props.children}

			{(props.meta.error || props.meta.submitError) && props.meta.touched && (
				<div className={css.errorTip}>{props.meta.error || props.meta.submitError || 'Произошла ошибка'}</div>
			)}
		</div>
	);
}

export default InputError;
