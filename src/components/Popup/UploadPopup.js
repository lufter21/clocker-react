import UploadForm from '../AddPhoto/UploadForm';
import './Popup.scss';

function UploadPopup(props) {
    return (
        <div className="popup__window">
            <div className="popup__inner p-0">
                <button className="js-popup-close popup-close-btn" onClick={props.close}></button>
            
                <UploadForm />
            </div>
        </div>
    );
}

export default UploadPopup;