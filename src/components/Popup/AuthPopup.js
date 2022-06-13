import AuthForm from '../Authorisation/AuthForm';
import ConfirmForm from '../Authorisation/ConfirmForm';
import NewUserForm from '../Authorisation/NewUserForm';
import './Popup.scss';

function AuthPopup(props) {
  return (
    <div className="popup__window">
      <div className="popup__inner">
        <button className="js-popup-close popup-close-btn" onClick={props.close}></button>

        <div className="popup__title">{props.title}</div>

        {props.subTitle && <div className="popup__sub-title">{props.subTitle}</div>}

        {props.form === 'AuthForm' && <AuthForm />}

        {props.form === 'ConfirmForm' && <ConfirmForm />}

        {props.form === 'NewUserForm' && <NewUserForm />}
      </div>
    </div>
  );
}

export default AuthPopup;
