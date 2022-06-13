import { useState } from 'react';
import { Form } from 'react-final-form';
import { useDispatch } from 'react-redux';
import { closePopup } from '../../app/popupSlice';
import { useUpdateNotificationMutation } from '../../app/services/notificationApi';
import { usersApi } from '../../app/services/usersApi';
import { useGetBrandsQuery } from '../../app/services/watchApi';
import BrandsItems from '../Brands/Brands';
import BrandsForm from '../Brands/BrandsForm';
import formCss from '../Form/Form.module.scss';
import './Popup.scss';

function BrandsPopup(props) {
    const dispatch = useDispatch();
    const [search, setSearch] = useState({ title: '', limit: 99999 });
    const [popError, setPopError] = useState();
    const { data = [] } = useGetBrandsQuery(search);
    const [updateNotification] = useUpdateNotificationMutation();

    const onSubmit = function (data, form, callback) {
        updateNotification({ brands: data.notifyBrands })
            .then(function (res) {
                if (res.error) {
                    setPopError(res.error.data.brands[0]);
                } else {
                    dispatch(
                        usersApi.util.updateQueryData('getProfile', undefined, (userData) => {
                            userData.notificationSettings = res.data;
                        })
                    );

                    dispatch(closePopup());
                }

                callback();

            }).catch(function (error) {
                console.error(new Error(error));
            });
    }

    return (
        <div className="popup__window">
            <div className="popup__inner p-0">
                <button className="js-popup-close popup-close-btn" onClick={props.close}></button>

                <div className="popup__brands">
                    <div className="popup__title bold mb-26">
                        Бренды
                    </div>

                    <BrandsForm setSearch={setSearch} search={search} color="white" />

                    <Form
                        onSubmit={onSubmit}
                        initialValues={{ notifyBrands: props.notifyBrands }}
                        render={(props) => {
                            const formClass = props.submitting ? formCss.form + ' ' + formCss.form_sending : formCss.form;

                            return (
                                <form onSubmit={props.handleSubmit} className={formClass}>
                                    <div className="popup__brands-scroll">
                                        <BrandsItems data={data} isCheckbox={true} />
                                    </div>
                                    <div className={formCss.form__row}>
                                        <button type="submit" className={formCss.form__submit + ' ' + formCss.form__submit_wh}>
                                            Применить
                                        </button>
                                    </div>

                                    {popError &&
                                        <div className={formCss.form__error}>
                                            {popError}
                                        </div>
                                    }
                                </form>
                            );
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default BrandsPopup;