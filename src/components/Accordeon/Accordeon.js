import { useRef, useState } from 'react';
import { parseHTML } from '../../helpers/helpres';
import './Accordeon.scss';

const AccordItem = function (props) {
	const contRef = useRef();
	const btnClass = props.dataKey === props.itemInd ? 'accord__button active' : 'accord__button';
	const contStyle = props.dataKey === props.itemInd ? { height: contRef.current.scrollHeight + 'px' } : { height: 0 };
	const btnTxt = parseHTML(props.btn);
	const contentText = parseHTML(props.text);

	const btnClick = function () {
		props.btnClick(props.dataKey);
	};

	return (
		<div className="accord__item">
			<button className={btnClass} onClick={btnClick}>
				<span className="accord__btn-txt">{btnTxt}</span>
				<span className="accord__btn-btn"></span>
			</button>
			<div ref={contRef} className="accord__content" style={contStyle}>
				<div className="accord__content-inner">{contentText}</div>
			</div>
		</div>
	);
};

function Accordeon(props) {
	const [itemInd, setItemInd] = useState();

	const btnClick = function (ind) {
		if (ind === itemInd) {
			setItemInd(null);
		} else {
			setItemInd(ind);
		}
	};

	const items = props.data ? props.data.map((item, i) => ( <AccordItem btnClick={btnClick} dataKey={i} itemInd={itemInd} {...item} key={i} /> )) : [];

	return <div className="accord">{items}</div>;
}

export default Accordeon;