import { useDispatch } from 'react-redux';
import { showAuth } from '../../app/popupSlice';
import './Popup.scss';

function ProVersionPopup(props) {
    const dispatch = useDispatch();

    const showNew = function () {
        dispatch(showAuth({
            title: 'Заполните данные',
            subTitle: 'Для доступа к аукционам, необходимо заполнить данные в форме ниже и дождаться подтверждения верификации администратором',
            form: 'NewUserForm'
        }));
    }

    return (
        <div className="popup__window">
            <div className="popup__inner">
                <button className="js-popup-close popup-close-btn" onClick={props.close}></button>

                <div className="popup__title">
                    Оформить Pro - версию
                </div>
                <div className="popup__sub-title-bold">
                    200 <span className="mSign">&#8381;</span> / месяц
                </div>

                <div className="popup__text">
                    <ul className="list">
                        <li>Вы экономите время, так как вам не нужно объезжать несколько ламбардов в поисках наиболее выгодной цены</li>
                        <li>Вы узнаете предварительную стоимость часов сразу и в режиме онлайн </li>
                        <li>Вы максимально быстро продаете ваши часы, так как мы проводим по несколько аукцинов в день </li>
                    </ul>
                </div>

                <div className="popup__btn">
                    <button className="btn" onClick={showNew}>Оформить</button>
                </div>
            </div>
        </div>
    );
}

export default ProVersionPopup;