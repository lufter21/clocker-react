import './Header.scss';
import Menu from './Menu';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useGetCitiesQuery } from '../../app/services/usersApi';
import { showAuth } from '../../app/popupSlice';
import { useEffect, useRef, useState } from 'react';
import css from '../Form/Autocomplete/Autocomplete.module.scss';
import { useOutsideClick } from '../../hook/useOutsideClick';

function Header() {
	const popup = useRef(null);
	const { data = [], isFetching } = useGetCitiesQuery();
	const dispatch = useDispatch();
	const { isLogin } = useSelector((state) => state.auth);
	const [openMenu, setOpenMenu] = useState(false);
	const [scrollY, setScrollY] = useState(null);

	const Auth = () => {
		setOpenMenu(false);
		dispatch(showAuth());
	};

	const toggleMenu = () => {
		if (!openMenu) {
			setScrollY(window.scrollY);
			document.body.style.top = `${window.scrollY}px`;
			document.body.style.position = 'fixed';
			document.documentElement.classList.add('is-locked');
			setOpenMenu(!openMenu);
		}

		if (openMenu) {
			closeMenu();
		}
	};

	const closeMenu = () => {
		document.body.style.top = '';
		document.body.style.position = '';
		document.documentElement.classList.remove('is-locked');
		setOpenMenu(false);
		window.scrollTo(0, scrollY);
	};

	const [city, setCity] = useState({ isOpen: false, title: 'Lviv' });
	const ref = useRef(null);
	const toggleCity = () => setCity({ ...city, isOpen: !city.isOpen });
	const closeCity = () => setCity({ ...city, isOpen: false });

	const selectCity = (event, value) => {
		event.stopPropagation();
		setCity({ ...city, title: value, isOpen: false });
	};
	
	useOutsideClick(ref, closeCity);

	const optClass = city.isOpen ? css.optionsWrap + ' ' + css.optionsWrap_vis : css.optionsWrap;

	function syncHeight() {
		document.documentElement.style.setProperty('--window-inner-height', `${window.innerHeight}px`);
		popup.current.style.setProperty('--height', `${window.innerHeight}px`);
	}

	useEffect(() => {
		if (!!popup) {
			window.addEventListener('resize', syncHeight);
			return () => {
				window.removeEventListener('resize', syncHeight);
			};
		}
	}, [popup]);

	return (
		<header id="header" className={'header' + (openMenu ? ' opened' : '')}>
			<div ref={popup} className="header__row row row_col-middle">
				<div className="col-4">
					<div className="header__form" ref={ref}>
						<div className="header__wrap">
							<div className={css.autocomplete} onClick={toggleCity}>
								<button className={css.input}>{city.title}</button>
								<label className={css.arr}></label>
							</div>
							{!isFetching && (
								<div className={optClass}>
									<ul className={css.options}>
										{data.map((el) => (
											<li className={css.optionsLi} key={el}>
												<button type="button" className={css.optionsBtn} onClick={(event) => selectCity(event, el)}>{el}</button>
											</li>
										))}
									</ul>
								</div>
							)}
						</div>
					</div>
				</div>
				<div className="col-4 pos-r sm-col_first">
					<div className="header__abs">
						<div className="row row_wrp row_col-middle">
							<div className="col">
								<Link to="/" className="header__logo sm-hidden">
									<img src={logo} alt="logo" />
								</Link>
							</div>
							<nav className="col">
								<Menu onClick={closeMenu} isLogin={isLogin} />
							</nav>

							{!isLogin && (
								<button className="header__link md-x-hidden" onClick={Auth}>
									Sign In
								</button>
							)}
						</div>
					</div>
				</div>
				<div className="col-4 ta-r">
					<a href="tel:+0005550000" className="header__link">
						+000 555 00 00
					</a>

					{!isLogin && (
						<button className="header__link sm-hidden" onClick={Auth}>
							Sign In
						</button>
					)}
				</div>
			</div>

			<button className={'open-menu-btn' + (openMenu ? ' opened' : '')} onClick={toggleMenu}>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
			</button>

			<Link to="/" className="header__logo md-x-hidden">
				<img src={logo} alt="logo" />
			</Link>
		</header>
	);
}

export default Header;
