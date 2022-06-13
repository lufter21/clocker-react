import './FirstScreen.scss';

function FirstScreen(props) {
	return (
		<div
			className={
				'first-screen first-screen_bg' +
				(!!props.className ? ' ' + props.className : '') +
				(!!props.stepOne ? ' ' + props.stepOne : '')
			}
		>
			<div className="row row_wrp row_col-middle">
				<div className="col-7">
					<div className="first-screen__title">{props.title}</div>
					{props.title_sm && (
						<div className="first-screen__title first-screen__title_sm">{props.title_sm}</div>
					)}
					{props.sub_title && <div className="first-screen__sub-title">{props.sub_title}</div>}
					{props.bold_tit && <div className="first-screen__bold-title">{props.bold_tit}</div>}
					{props.btn_render && <div className="first-screen__btn">{props.btn_render()}</div>}
				</div>
			</div>
		</div>
	);
}

export default FirstScreen;
