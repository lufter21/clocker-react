import './Popup.scss';

function MessagePopup(props) {
    return (
        <div className="popup__window">
            <div className="popup__inner">
                <button className="js-popup-close popup-close-btn" onClick={props.close}></button>
                <div className="popup__watch-img"></div>
                <div className="popup__message">
                    <div className="popup__message-tit">
                        {props.title}
                    </div>
                    <div className="popup__message-desc">
                        {props.text}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MessagePopup;