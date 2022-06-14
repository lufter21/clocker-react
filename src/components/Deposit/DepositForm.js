import { Field, Form } from 'react-final-form';
import css from '../Form/Form.module.scss';
import Input from '../Form/Input/Input';
import { useDispatch } from 'react-redux';
import { showDeposit } from '../../app/popupSlice';
import InputError from '../Form/InputError/InputError';
import { makeDeposit } from '../../app/userDataSlice';
import useValidator from '../Form/useValidator';

function DepositForm() {
    const dispatch = useDispatch();

    const onSubmit = (data, form, callback) => {
        dispatch(makeDeposit(data))
            .then(action => {
                if (action.meta.requestStatus === 'fulfilled') {
                    callback();

                    if (!action.payload || !action.payload.error) {
                        dispatch(showDeposit({ depositForm: 'DepositPayForm' }));
                    }
                }
            }).catch(error => {
                console.error(new Error(error));
            });
    }

    const {composeValidators, required, email, phoneNumber} = useValidator();

    return (
        <Form onSubmit={onSubmit} render={(props) => {
            const formClass = props.submitting ? css.form + ' ' + css.form_sending : css.form;

            return (
                <form onSubmit={props.handleSubmit} className={formClass}>
                    <div className={css.form__field + ' ' + css.form__field_mt}>
                        <Field
                            name="fio"
                            placeholder="Name"
                            validate={composeValidators(required('*Required field'))}
                            render={props => (
                                <InputError children={<Input {...props} />} {...props} />
                            )}
                        />
                    </div>

                    <div className={css.form__field + ' ' + css.form__field_mt}>
                        <Field
                            name="email"
                            placeholder="E-mail"
                            validate={composeValidators(required('*Required field'), email)}
                            render={props => (
                                <InputError children={<Input {...props} />} {...props} />
                            )}
                        />
                    </div>

                    <div className={css.form__field + ' ' + css.form__field_mt}>
                        <Field
                            name="phone_number"
                            placeholder="Phone number"
                            validate={composeValidators(required('*Required field'), phoneNumber)}
                            render={props => (
                                <InputError children={<Input {...props} />} {...props} />
                            )}
                        />
                    </div>

                    <div className={css.form__field + ' ' + css.form__field_mt}>
                        <Field
                            name="confirm_code"
                            placeholder="Confirm code"
                            validate={composeValidators(required('*Required field'))}
                            render={props => (
                                <InputError children={<Input {...props} />} {...props} />
                            )}
                        />
                    </div>

                    <div className={css.form__row + ' ' + css.form__row_btnV2}>
                        <button type="submit" className={css.form__submit + ' ' + css.form__submit_wh}>Submit</button>
                    </div>
                </form>
            );
        }} />
    );
}

export default DepositForm;