import { Field, Form } from 'react-final-form';
import css from '../Form/Form.module.scss';
import Input from '../Form/Input/Input';
import { useDispatch } from 'react-redux';
import { closePopup, showAuth } from '../../app/popupSlice';
import InputError from '../Form/InputError/InputError';
import useValidator from '../Form/useValidator';
import { useAuthSendMutation } from '../../app/services/authApi';
import { parseToInt } from '../../helpers/helpres';
import { login, setKey } from '../../app/authSlice';
import { useNavigate } from 'react-router-dom';

function AuthForm() {
	const dispatch = useDispatch();
	const navigation = useNavigate();
	const [send, { error }] = useAuthSendMutation();

	const onSubmit = async (data, form, callback) => {

		dispatch(login({
			role: +data.phone
		}));

		callback();

		navigation('/cabinet');

		dispatch(closePopup());

		// const newData = { ...data, phone: parseToInt(data.phone) };

		// try {
		// 	const { data: response } = await send(newData);
		// 	dispatch(setKey(response.key));
		// 	dispatch(
		// 		showAuth({
		// 			title: 'Enter confirm number',
		// 			form: 'ConfirmForm',
		// 		})
		// 	);
		// 	callback();
		// } catch (error) {
		// 	console.error(new Error(error));
		// }
	};

	const { composeValidators, required, phoneNumber } = useValidator();

	return (
		<Form
			onSubmit={onSubmit}
			render={(props) => {
				const formClass = props.submitting ? css.form + ' ' + css.form_sending : css.form;

				return (
					<form onSubmit={props.handleSubmit} className={formClass}>
						<Field
							name="phone"
							placeholder="1 or 2"
							validate={composeValidators(required('*Required field'))}
							render={(props) => <InputError children={<Input {...props} />} {...props} />}
						/>
						<div className={css.form__row}>
							<button type="submit" className={css.form__submit + ' ' + css.form__submit_wh}>
								Submit
							</button>
						</div>
					</form>
				);
			}}
		/>
	);
}

export default AuthForm;
