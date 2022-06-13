import { Field, Form } from 'react-final-form';
import css from '../Form/Form.module.scss';
import Input from '../Form/Input/Input';
import { useDispatch, useSelector } from 'react-redux';
import { closePopup } from '../../app/popupSlice';
import InputError from '../Form/InputError/InputError';
import { useNavigate, useLocation } from 'react-router-dom';
import useValidator from '../Form/useValidator';
import { useAuthSmsMutation } from '../../app/services/authApi';
import { login, setAuthData } from '../../app/authSlice';

function ConfirmForm(props) {
	const location = useLocation();
	const dispatch = useDispatch();
	const nav = useNavigate();
	const [sms] = useAuthSmsMutation();
	const { data: authData } = useSelector((state) => state.auth);

	const onSubmit = async ({ code }, form, callback) => {
		const role = location.pathname.includes('/for-dealers') ? 2 : 1;
		const newData = { ...authData, role, code: Number(code) };
		dispatch(setAuthData(newData));

		try {
			const { data } = await sms(newData);
			dispatch(login(data));
			dispatch(closePopup());
			nav('/cabinet');
			callback();
		} catch (error) {
			console.error(new Error(error));
			return { code: 'Неверные данные' };
		}
	};

	const { composeValidators, required } = useValidator();

	return (
		<Form
			onSubmit={onSubmit}
			render={(props) => {
				const formClass = props.submitting ? css.form + ' ' + css.form_sending : css.form;

				return (
					<form onSubmit={props.handleSubmit} className={formClass}>
						<Field
							name="code"
							validate={composeValidators(required('*Обязательное поле'))}
							render={(props) => <InputError children={<Input {...props} />} {...props} />}
						/>

						<div className={css.form__row}>
							<button type="submit" className={css.form__submit + ' ' + css.form__submit_wh}>
								Отправить
							</button>
						</div>
					</form>
				);
			}}
		/>
	);
}

export default ConfirmForm;
