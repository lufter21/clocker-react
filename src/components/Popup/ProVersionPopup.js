import { useDispatch } from 'react-redux';
import { showAuth } from '../../app/popupSlice';
import './Popup.scss';

function ProVersionPopup(props) {
    const dispatch = useDispatch();

    const showNew = function () {
        dispatch(showAuth({
            title: 'Fill in the details',
            subTitle: 'To access the auctions, you must fill in the data in the form below and wait for the verification confirmation by the administrator',
            form: 'NewUserForm'
        }));
    }

    return (
        <div className="popup__window">
            <div className="popup__inner">
                <button className="js-popup-close popup-close-btn" onClick={props.close}></button>

                <div className="popup__title">
                Checkout Pro version
                </div>
                <div className="popup__sub-title-bold">
                    $ 200 per month
                </div>

                <div className="popup__text">
                    <ul className="list">
                        <li>You save time as you don't have to drive around several pawn shops in search of the best price</li>
                        <li>You will find out the preliminary cost of watches immediately and online</li>
                        <li>You sell your watch as quickly as possible, as we hold several auctions per day</li>
                    </ul>
                </div>

                <div className="popup__btn">
                    <button className="btn" onClick={showNew}>Submit</button>
                </div>
            </div>
        </div>
    );
}

export default ProVersionPopup;