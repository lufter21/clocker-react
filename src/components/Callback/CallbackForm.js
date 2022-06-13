import { Field, Form } from 'react-final-form';
import css from '../Form/Form.module.scss';
import Input from '../Form/Input/Input';
import { useAddInvestorsMutation } from '../../app/services/investorsApi';
import { useDispatch } from 'react-redux';
import { showMessage } from '../../app/popupSlice';
import InputError from '../Form/InputError/InputError';
import useValidator from '../Form/useValidator';
import { parseToInt } from '../../helpers/helpres';

function CallbackForm() {
	const dispatch = useDispatch();
	const [addInvestors] = useAddInvestorsMutation();

	const onSubmit = (data, form, callback) => {
		const newData = { ...data, phoneNumber: parseToInt(data.phoneNumber) };

		addInvestors(newData)
			.then((result) => {
				callback();

				const res = result || {};

				if (!res.error) {
					dispatch(
						showMessage({
							title: 'Thanks!',
							text: 'We will contact you within an hour',
						})
					);
					form.restart();
				}
			})
			.catch((error) => {
				console.error(new Error(error));
			});
	};

	const { composeValidators, required, phoneNumber, maxLenght } = useValidator();

	return (
		<Form
			onSubmit={onSubmit}
			render={(props) => {
				const formClass = props.submitting ? css.form + ' ' + css.form_sending : css.form;

				return (
					<form onSubmit={props.handleSubmit} className={formClass}>
						<div className={css.form__border}>
							<div className="row">
								<div className="col-6">
									<div className={css.form__row}>
										<Field
											name="name"
											placeholder="Name"
											validate={composeValidators(required('*Required field'))}
											render={(props) => <InputError children={<Input {...props} />} {...props} />}
										/>
									</div>
									<div className={css.form__row}>
										<Field
											name="phoneNumber"
											placeholder="Phone number"
											validate={composeValidators(required('*Required field'), phoneNumber)}
											render={(props) => <InputError children={<Input {...props} />} {...props} />}
										/>
									</div>
									<div className={css.form__row + ' ' + css.form__row_btn + ' sm-hidden'}>
										<button type="submit" className={css.form__submit}>Submit</button>
									</div>
								</div>
								<div className="col-6 sm-mt-16">
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur nobis fugiat aliquid cum, mollitia quaerat laborum beatae sapiente soluta quis laboriosam inventore! Quisquam rerum deserunt aperiam aut, mollitia dicta harum?
								</div>
							</div>
						</div>

						<div className={css.form__row + ' ' + css.form__row_btn + ' md-x-hidden'}>
							<button type="submit" className={css.form__submit}>
								Отправить
							</button>
						</div>
					</form>
				);
			}}
		/>
	);
}

export default CallbackForm;
