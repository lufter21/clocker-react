import { Field, Form } from 'react-final-form';
import css from '../Form/Form.module.scss';
import Input from '../Form/Input/Input';
import InputError from '../Form/InputError/InputError';
import { useDispatch } from 'react-redux';
import { showMessage } from '../../app/popupSlice';
import { userAuth } from '../../app/userDataSlice';
import useValidator from '../Form/useValidator';

function NewUserForm() {
    const dispatch = useDispatch();

    const onSubmit = (data, form, callback) => {
        dispatch(userAuth(data))
            .then(action => {
                if (action.meta.requestStatus === 'fulfilled') {
                    callback();

                    if (!action.payload || !action.payload.error) {
                        dispatch(showMessage({
                            title: 'Спасибо!',
                            text: 'Данные успешно сохранены!'
                        }));
                    }
                }
            }).catch(error => {
                console.error(new Error(error));
            });
    }

    const {composeValidators, required, email} = useValidator();

    return (
        <Form onSubmit={onSubmit} render={(props) => {
            const formClass = props.submitting ? css.form + ' ' + css.form_sending : css.form;

            return (
                <form onSubmit={props.handleSubmit} className={formClass}>
                    <div className={css.form__field + ' ' + css.form__field_mt}>
                    <Field
                        name="organisation_name"
                        placeholder="Название организации"
                        validate={composeValidators(required('*Обязательное поле'))}
                        render={props => (
                            <InputError children={<Input {...props} />} {...props} />
                        )}
                    />
                    </div>

                    <div className={css.form__field + ' ' + css.form__field_mt}>
                    <Field
                        name="inn"
                        placeholder="ИНН"
                        validate={composeValidators(required('*Обязательное поле'))}
                        render={props => (
                            <InputError children={<Input {...props} />} {...props} />
                        )}
                    />
                    </div>

                    <div className={css.form__field + ' ' + css.form__field_mt}>
                    <Field
                        name="email"
                        placeholder="email"
                        validate={composeValidators(required('*Обязательное поле'), email)}
                        render={props => (
                            <InputError children={<Input {...props} />} {...props} />
                        )}
                    />
                    </div>
                    
                    <div className={css.form__row +' '+css.form__row_btnV2}>
                        <button type="submit" className={css.form__submit + ' ' + css.form__submit_wh}>Отправить</button>
                    </div>
                </form>
            );
        }} />
    );
}

export default NewUserForm;