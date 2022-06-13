import './Popup.scss';
import { useDispatch, useSelector } from 'react-redux';
import { closePopup, selectAuth, selectMessage, selectVisible } from '../../app/popupSlice';
import MessagePopup from './MessagePopup';
import AuthPopup from './AuthPopup';
import UploadPopup from './UploadPopup';
import DepositPopup from './DepositPopup';
import InfoPopup from './InfoPopup';
import ProVersionPopup from './ProVersionPopup';
import BrandsPopup from './BrandsPopup';
import WatchPopup from './WatchPopup';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import LightboxPopup from './LightboxPopup';

let winScrollTop = 0;

const fixBody = function (st) {
    const headerElem = document.getElementById('header');

    if (st && !document.body.classList.contains('popup-is-opened')) {
        winScrollTop = window.pageYOffset;

        const offset = window.innerWidth - document.documentElement.clientWidth;

        document.body.classList.add('popup-is-opened');

        if (headerElem) {
            headerElem.style.transition = '0s';
            headerElem.style.right = offset + 'px';
        }

        document.body.style.right = offset + 'px';

        document.body.style.top = -winScrollTop + 'px';
    } else if (!st) {
        if (headerElem) {
            headerElem.style.right = '';
            setTimeout(function () {
                headerElem.style.transition = '';
            }, 321);
        }

        document.body.classList.remove('popup-is-opened');

        window.scrollTo(0, winScrollTop);
    }
};

function Popup() {
    const dispatch = useDispatch();
    const visiblePopupName = useSelector(selectVisible);
    const message = useSelector(selectMessage);
    const auth = useSelector(selectAuth);
    const depoForm = useSelector((state) => state.popup.depositForm);
    const info = useSelector((state) => state.popup.info);
    const notifyBrands = useSelector((state) => state.popup.notifyBrands);
    const watchData = useSelector((state) => state.popup.watchData);
    const lightboxData = useSelector((state) => state.popup.lightboxData);
    const { curr } = useSelector((state) => state.common);
    const navigation = useNavigate();

    const close = () => {
        dispatch(closePopup());
    };

    const closeWatch = () => {
        dispatch(closePopup());
        navigation('/cabinet');
    };

    let visiblePopup = null;

    switch (visiblePopupName) {
        case 'MessagePopup':
            visiblePopup = <MessagePopup close={close} {...message} />;
            break;

        case 'InfoPopup':
            visiblePopup = <InfoPopup close={close} {...info} />;
            break;

        case 'AuthPopup':
            visiblePopup = <AuthPopup close={close} {...auth} />;
            break;

        case 'UploadPopup':
            visiblePopup = <UploadPopup close={close} />;
            break;

        case 'DepositPopup':
            visiblePopup = <DepositPopup close={close} form={depoForm} />;
            break;

        case 'ProVersionPopup':
            visiblePopup = <ProVersionPopup close={close} />;
            break;

        case 'BrandsPopup':
            visiblePopup = <BrandsPopup close={close} notifyBrands={notifyBrands} />;
            break;

        case 'WatchPopup':
            visiblePopup = <WatchPopup close={closeWatch} curr={curr} {...watchData} />;
            break;

        case 'LightboxPopup':
            visiblePopup = <LightboxPopup close={close} {...lightboxData} />;
            break;

        default:
            visiblePopup = null;
            break;
    }

    useEffect(function() {
        if (visiblePopup) {
            fixBody(true);
        } else {
            fixBody(false);
        }
    }, [visiblePopupName]);

    return <>{visiblePopup && <div className="popup">{visiblePopup}</div>}</>;
}

export default Popup;
