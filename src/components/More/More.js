import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function More(props) {
	const { isOpen } = useSelector((state) => state.common);
	const [count, setCount] = useState(+props.initCount);
	const resultItems = props.data ? props.data.slice(0, count) : [];

	const showAll = function () {
		setCount(undefined);
	};

	if (props.data && (!props.data.length || props.data.length <= count)) {
		setCount(undefined);
	}

	useEffect(() => {
		props.btnText === 'Все вопросы' && isOpen && showAll();
	}, [isOpen]);

	return (
		<>
			{props.children(resultItems)}

			{count !== undefined && (
				<div className="row mt-80">
					<div className="col-4 col_center">
						<button onClick={showAll} className="btn">
							{props.btnText}
						</button>
					</div>
				</div>
			)}
		</>
	);
}

export default More;
