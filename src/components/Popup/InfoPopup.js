import './Popup.scss';
import img1 from '../../images/watch-1.png';
import img2 from '../../images/watch-2.png';
import img3 from '../../images/watch-3.png';
import img4 from '../../images/watch-4.png';

const pictures = [
	{
		title: 'Front photo',
		img: img1,
	},
	{
		title: 'Back side photo',
		img: img2,
	},
	{
		title: 'Side photo (both sides)',
		img: img3,
	},
	{
		title: 'Photo of the fastener (outside and inside)',
		img: img4,
	},
];

function InfoPopup(props) {
	return (
		<div className="popup__window">
			<div className="popup__inner popup__inner_info">
				<button className="js-popup-close popup-close-btn" onClick={props.close}></button>

				<div className="popup__title">{props.title}</div>

				<div className="popup__info-pictures">
					{pictures.map((picture) => (
						<div key={picture.title} className="popup__info-picture">
							<img src={picture.img} alt="" />
							<h5 className="popup__info-title">{picture.title}</h5>
						</div>
					))}
				</div>
				<div className="popup__info-block">+ photo of the warranty card on both sides, boxes</div>
			</div>
		</div>
	);
}

export default InfoPopup;
