import './AddPhotoButton.scss';
import { showUpload } from '../../app/popupSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectPreparedFilesCount } from '../../app/formSlice';

function AddPhotoButton() {
    const dispatch = useDispatch();
    const filesCount = useSelector(selectPreparedFilesCount);
    const btnTxt = filesCount > 0 ? 'Photos count: ' + filesCount : 'Attach photos, 6 pcs';

    const openDialog = function () {
        dispatch(showUpload());
    }

    return (
        <button type="button" className="add-btn" onClick={openDialog}>
            <span className="add-btn__sign"></span>
            {btnTxt}
        </button>
    );
}

export default AddPhotoButton;