import DepositForm from '../Deposit/DepositForm';
import DepositPayForm from '../Deposit/DepositPayForm';
import './Popup.scss';

function DepositPopup(props) {
    return (
        <div className="popup__window">
            <div className="popup__inner">
                <button className="js-popup-close popup-close-btn" onClick={props.close}></button>

                <div className="popup__title mb-26">
                Make a deposit
                </div>

                {props.form === 'DepositForm' &&
                    <>
                        <ul className="dots mb-44">
                            <li className="active"></li>
                            <li></li>
                        </ul>

                        <DepositForm />
                    </>
                }

                {props.form === 'DepositPayForm' &&
                    <>
                        <ul className="dots mb-44">
                            <li></li>
                            <li className="active"></li>
                        </ul>

                        <DepositPayForm />
                    </>
                }
            </div>
        </div>
    );
}

export default DepositPopup;