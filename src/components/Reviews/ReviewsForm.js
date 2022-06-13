import css from '../Form/Form.module.scss';
import { Field, Form } from 'react-final-form';
import Input from '../Form/Input/Input';
import Textarea from '../Form/Textarea/Textarea';
import { useAddReviewMutation } from '../../app/services/reviewsApi';
import { useDispatch } from 'react-redux';
import { showMessage } from '../../app/popupSlice';
import InputError from '../Form/InputError/InputError';
import useValidator from '../Form/useValidator';

function ReviewsForm() {
	const dispatch = useDispatch();
	const [addReview] = useAddReviewMutation();

	const onSubmit = (data, form, callback) => {
		addReview(data)
			.then((result) => {
				callback();

				const res = result || {};

				if (!res.error) {
					dispatch(
						showMessage({
							title: 'Thanks!',
							text: 'Your review has been successfully sent.',
						})
					);
					form.restart();
				}
			})
			.catch((error) => {
				console.error(new Error(error));
			});
	};

	const { composeValidators, required, email, maxLength1000, maxLength64 } = useValidator();

	return (
		<Form onSubmit={onSubmit}>
			{(props) => (
				<form
					onSubmit={props.handleSubmit}
					className={props.submitting ? css.form + ' ' + css.form_sending : css.form}
				>
					<div className={css.form__border}>
						<div className={css.form__row + ' row'}>
							<div className="col-6">
								<Field
									name="name"
									placeholder="Name"
									validate={composeValidators(required('*Required field'), maxLength64)}
									render={(props) => <InputError children={<Input {...props} />} {...props} />}
								/>
							</div>
							<div className="col-6">
								<div className={css.form__field}>
									<Field
										name="mail"
										placeholder="Email"
										validate={composeValidators(required('*Required field'), email)}
										render={(props) => <InputError children={<Input {...props} />} {...props} />}
									/>
								</div>
							</div>
						</div>

						<div className={css.form__row + ' row'}>
							<div className="col-12">
								<Field
									name="text"
									placeholder="Comment"
									validate={composeValidators(required('*Required field'), maxLength1000)}
									render={(props) => <InputError children={<Textarea {...props} />} {...props} />}
								/>
							</div>
						</div>
					</div>

					<div className={css.form__row + ' ' + css.form__row_btn + ' row'}>
						<div className="col-4 col_center">
							<button type="submit" className={css.form__submit}>Submit</button>
						</div>
					</div>
				</form>
			)}
		</Form>
	);
}

export default ReviewsForm;
