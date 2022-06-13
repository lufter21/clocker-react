import './Menu.scss';
import data from '../../app/data/headerMenu.json';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

const ChildItem = function (props) {
	return (
		<li className="sub-menu__item">
			{(props.link.includes('tel:') || props.link.includes('mailto:')) && (
				<a href={props.link} className="sub-menu__a" onClick={props.onClick}>
					{props.name}
				</a>
			)}

			{!props.link.includes('tel:') && !props.link.includes('mailto:') && (
				<NavLink to={props.link} className="sub-menu__a" onClick={props.onClick}>
					{props.name}
				</NavLink>
			)}
		</li>
	);
};

const Item = function (props) {
	const [openChild, setOpenChild] = useState(false);
	const children = props.children
		? props.children.map((item, i) => <ChildItem onClick={props.onClick} {...item} key={i} />)
		: null,
		css = props.children ? 'menu__item menu__item_has-children' : 'menu__item';

	const openChildren = function () {
		setOpenChild(!openChild);
	};

	return (
		<li className={css}>
			{props.link && (
				<NavLink to={props.link} className="menu__a" onClick={props.onClick}>
					{props.name}
				</NavLink>
			)}

			{!props.link && (
				<button type="button" className="menu__a" onClick={openChildren}>
					{props.name}
				</button>
			)}

			{children && (
				<div className={'sub-menu menu__sub-menu' + (openChild ? ' active' : '')}>
					<ul className="sub-menu__inner">{children}</ul>
				</div>
			)}
		</li>
	);
};

function Menu({ onClick, isLogin }) {
	const menuData = [...data];

	if (isLogin) {
		menuData.unshift({
			name: 'Cabinet',
			link: '/cabinet',
		});
	}

	const items = menuData.map((item, i) => <Item onClick={onClick} {...item} key={i} />);

	return <ul className={'menu' + (isLogin ? ' menu_ml' : '')}>{items}</ul>;
}

export default Menu;
