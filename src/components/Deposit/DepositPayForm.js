import { Field, Form } from 'react-final-form';
import css from '../Form/Form.module.scss';
import Input from '../Form/Input/Input';
import InputError from '../Form/InputError/InputError';
import { useDispatch } from 'react-redux';
import { showMessage } from '../../app/popupSlice';
import { makeDeposit } from '../../app/userDataSlice';
import useValidator from '../Form/useValidator';

function DepositPayForm() {
    const dispatch = useDispatch();

    const onSubmit = (data, form, callback) => {
        dispatch(makeDeposit(data))
            .then(action => {
                if (action.meta.requestStatus === 'fulfilled') {
                    callback();

                    if (!action.payload || !action.payload.error) {
                        dispatch(showMessage({
                            title: 'Спасибо!',
                            text: 'Вас счет успешно пополнен!'
                        }));
                    }
                }
            }).catch(error => {
                console.error(new Error(error));
            });
    }

    const {composeValidators, required} = useValidator();

    return (
        <Form onSubmit={onSubmit} render={(props) => {
            const formClass = props.submitting ? css.form + ' ' + css.form_sending : css.form;

            return (
                <form onSubmit={props.handleSubmit} className={formClass}>
                    <div className={css.form__field + ' ' + css.form__field_mt}>
                    <Field
                        name="deposit"
                        placeholder="Ежемесячный взнос"
                        validate={composeValidators(required('*Обязательное поле'))}
                        render={props => (
                            <InputError children={<Input {...props} />} {...props} />
                        )}
                    />
                    </div>
                    
                    <div className={css.form__row +' '+css.form__row_btnV2}>
                        <button type="submit" className={css.form__submit + ' ' + css.form__submit_wh}>Оплатить</button>
                    </div>
                </form>
            );
        }} />
    );
}

export default DepositPayForm;