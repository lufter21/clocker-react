import './UploadForm.scss';
import cloud from '../../images/cloud.svg';
import { useRef, useState } from 'react';
import { useEffect } from 'react';
import { addUploadFiles, addUploadView, deleteFile, selectPreparedFiles } from '../../app/formSlice';
import { useDispatch, useSelector } from 'react-redux';
import { closePopup } from '../../app/popupSlice';

const FileItem = function (props) {
	const onClick = function () {
		props.onClickDel(props.name);
	};

	return (
		<div className="upload-form__files-item">
			<div className="upload-form__files-inner">
				<img src={props.view} alt="img" className="fit" />
				<button className="upload-form__files-delete" onClick={onClick}></button>
			</div>
		</div>
	);
};

function UploadForm() {
	const dispatch = useDispatch();
	const dropAreaRef = useRef();
	const dropAreaRefTwo = useRef();
	const preparedFiles = useSelector(selectPreparedFiles);

	const [previewItems, setPerviewItems] = useState([]);

	const addView = function (files) {
		for (const file of files) {
			const reader = new FileReader();

			reader.onload = function (e) {
				dispatch(
					addUploadView({
						name: file.name,
						view: e.target.result,
					})
				);
			};

			reader.readAsDataURL(file);
		}
	};

	const onDragsHandler = (e, dropEl) => {
		e.preventDefault();
		e.stopPropagation();
		dropEl.classList.add('highlight');
	};

	const onDragLeaveHandler = (e, dropEl) => {
		e.preventDefault();
		e.stopPropagation();
		dropEl.classList.remove('highlight');
	};

	const onDropHandler = (e, dropEl) => {
		e.preventDefault();
		e.stopPropagation();
		dropEl.classList.remove('highlight');

		dispatch(addUploadFiles(e.dataTransfer.files));
		addView(e.dataTransfer.files);
	};

	useEffect(() => {
		const dropEl = dropAreaRef.current;

		if (!dropEl) {
			return;
		}

		['dragenter', 'dragover'].forEach((eventName) => {
			dropEl.addEventListener(eventName, (e) => onDragsHandler(e, dropEl));
		});

		dropEl.addEventListener('dragleave', (e) => onDragLeaveHandler(e, dropEl));
		dropEl.addEventListener('drop', (e) => onDropHandler(e, dropEl));

		return () => {
			['dragenter', 'dragover'].forEach((eventName) => {
				dropEl.removeEventListener(eventName, onDragsHandler);
			});

			dropEl.removeEventListener('dragleave', onDragLeaveHandler);
			dropEl.removeEventListener('drop', onDropHandler);
		};
	}, [dropAreaRef, dispatch]);

	useEffect(() => {
		const dropEl = dropAreaRefTwo.current;

		if (!dropEl) {
			return;
		}

		['dragenter', 'dragover'].forEach((eventName) => {
			dropEl.addEventListener(eventName, (e) => onDragsHandler(e, dropEl));
		});

		dropEl.addEventListener('dragleave', (e) => onDragLeaveHandler(e, dropEl));
		dropEl.addEventListener('drop', (e) => onDropHandler(e, dropEl));

		return () => {
			['dragenter', 'dragover'].forEach((eventName) => {
				dropEl.removeEventListener(eventName, onDragsHandler);
			});

			dropEl.removeEventListener('dragleave', onDragLeaveHandler);
			dropEl.removeEventListener('drop', onDropHandler);
		};
	}, [dropAreaRefTwo, dispatch]);

	useEffect(() => {
		!!preparedFiles.length
			? setPerviewItems(
					preparedFiles.map((item) => (
						<FileItem view={item.view} name={item.name} onClickDel={onClickDel} key={item.name} />
					))
			  )
			: setPerviewItems([]);
	}, [preparedFiles]);

	const changeInput = function (e) {
		dispatch(addUploadFiles(e.target.files));
		addView(e.target.files);
	};

	const confirm = function () {
		dispatch(closePopup());
	};

	const onClickDel = function (name) {
		dispatch(deleteFile(name));
	};

	return (
		<div className="upload-form">
			{previewItems.length === 0 && (
				<div className="upload-form__drop">
					<div className="upload-form__drop-img">
						<img src={cloud} alt="cloud" />
					</div>
					<div className="upload-form__drop-tit">Drop files here</div>
					<div className="upload-form__drop-subtit">or select</div>
				</div>
			)}

			<div className={`upload-form__files ${previewItems.length > 0 ? 'upload-form__files_visible' : ''}`}>
				{previewItems.length > 0 && previewItems}

				<div
					className={`upload-form__files-item ${
						previewItems.length < 6 ? '' : 'upload-form__files-item_hidden'
					}`}
				>
					<label
						ref={dropAreaRefTwo}
						htmlFor="upload-input-2142"
						className="upload-form__files-inner upload-form__files-inner_label"
					>
						<img src={cloud} alt="cloud" />
					</label>
				</div>
			</div>

			<div className="upload-form__note">You can add a maximum of 6 photos</div>

			<button
				className="upload-form__button"
				disabled={previewItems.length === 0 ? 'disabled' : ''}
				onClick={confirm}
			>
				Confirm
			</button>

			{!previewItems.length >= 6 || (
				<label ref={dropAreaRef} htmlFor="upload-input-2142" className="upload-form__label"></label>
			)}

			<input
				id="upload-input-2142"
				type="file"
				multiple
				onChange={changeInput}
				className="upload-form__input"
			/>
		</div>
	);
}

export default UploadForm;
