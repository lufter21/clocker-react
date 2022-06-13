import './Footer.scss';
import logo from '../../images/logo.svg';
import dataMenu from '../../app/data/footerMenu.json';
import { Link } from 'react-router-dom';

const MenuItem = function (props) {
	return (
		<li className="foot-nav__item">
			{(props.link.includes('tel:') || props.link.includes('mailto:')) && (
				<a href={props.link} className="foot-nav__a">
					{props.name}
				</a>
			)}

			{!props.link.includes('tel:') && !props.link.includes('mailto:') && (
				<Link to={props.link} className="foot-nav__a">
					{props.name}
				</Link>
			)}
		</li>
	);
};

const MenuBlock = function (props) {
	const items = props.children.map((item, i) => <MenuItem {...item} key={i} />);

	return (
		<div className="col-2">
			<div className="footer__tit">{props.name}</div>
			<ul className="foot-nav">{items}</ul>
		</div>
	);
};

function Footer() {
	const blocks = dataMenu.map((item, i) => <MenuBlock {...item} key={i} />);

	return (
		<footer className="footer">
			<div className="row row_wrp">
				<div className="col-4">
					<Link to="/" className="footer__logo">
						<img src={logo} alt="logo" />
					</Link>
				</div>

				{blocks}
			</div>
		</footer>
	);
}

export default Footer;
