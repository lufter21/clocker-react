import { useEffect, useState } from 'react';
import { Field, Form } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { useSendToEstimationMutation } from '../../app/services/watchApi';
import { selectPreparedFiles } from '../../app/formSlice';
import { showMessage } from '../../app/popupSlice';
import AddPhotoButton from '../AddPhoto/AddPhotoButton';
import css from '../Form/Form.module.scss';
import Input from '../Form/Input/Input';
import InputError from '../Form/InputError/InputError';
import useValidator from '../Form/useValidator';
import { parseToInt } from '../../helpers/helpres';
import imageCompression from 'browser-image-compression';
import { useGetDocumentsQuery } from '../../app/services/documentsApi';

function PreEstimateForm() {
	const dispatch = useDispatch();
	const preparedFiles = useSelector(selectPreparedFiles);

	// const { data: privacy } = useGetDocumentsQuery('api/documents/privacy_policy');
	// const { data: agreement } = useGetDocumentsQuery('api/documents/user_agreement');
	// const { data: offer } = useGetDocumentsQuery('api/documents/offer');

	const [filesError, setFilesError] = useState({});
	const [sendToEstimation] = useSendToEstimationMutation();

	useEffect(() => {
		if (preparedFiles.length) {
			setFilesError({});
		}
	}, [preparedFiles]);

	const onSubmit = (data, form, callback) => {
		data.files = preparedFiles.map((item) => item.file);

		if (!data.files || data.files.length < 3) {
			setFilesError({
				error: 'Upload at least 3 photos',
				touched: true,
			});

			callback();
			return;
		}

		const formData = new FormData();
		formData.append('phone_number', parseToInt(data.phoneNumber));

		const promises = data.files.map(async (file) => {
			const compressedFile = await imageCompression(file, {
				maxSizeMB: 1,
				maxWidthOrHeight: 1920,
				useWebWorker: true,
			});
			formData.append('file', new File([compressedFile], file.name));
		});

		Promise.all(promises).then(() => {
			sendToEstimation(formData)
				.then((result) => {
					callback();
					setFilesError({});

					const res = result || {};

					if (!res.error) {
						dispatch(
							showMessage({
								title: 'Thanks!',
								text: 'We will announce the price range within an hour.',
							})
						);
						form.restart();
					}
				})
				.catch((error) => {
					console.error(new Error(error));
				});
		});
	};

	const { composeValidators, required, phoneNumber } = useValidator();

	return (
		<Form
			onSubmit={onSubmit}
			render={(props) => {
				let formClass = css.form + ' ' + css.form_my;

				if (props.submitting) {
					formClass += ' ' + css.form_sending;
				}

				return (
					<form onSubmit={props.handleSubmit} className={formClass}>
						<div className="row">
							<div className="col-4">
								<div className={css.form__field}>
									<Field
										name="phoneNumber"
										placeholder="Phone number"
										validate={composeValidators(required('*Required field'), phoneNumber)}
										render={(props) => <InputError children={<Input {...props} />} {...props} />}
									/>
								</div>
							</div>
							<div className="col-4">
								<div className={css.form__field}>
									<InputError meta={filesError}>
										<AddPhotoButton />
									</InputError>
								</div>
							</div>
							<div className="col-4">
								<div className={css.form__field}>
									<button type="submit" className={css.form__submit}>
										Get a watch estimate
									</button>
								</div>
								<div className={css.form__privacy}>
									By clicking on the button, you agree to privacy policy.
								</div>
							</div>
						</div>
					</form>
				);
			}}
		/>
	);
}

export default PreEstimateForm;
