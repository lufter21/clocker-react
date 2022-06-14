import { useEffect, useState } from 'react';
import { Field, Form } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import css from '../Form/Form.module.scss';
import Input from '../Form/Input/Input';
import InputError from '../Form/InputError/InputError';
import useValidator from '../Form/useValidator';
import classes from '../Form/Input/Input.module.scss';
import './LotCard.scss';
import { useAutobetMutation, useIncreaseMutation } from '../../app/services/auctionsApi';
import { showLightbox, showMessage } from '../../app/popupSlice';
import { Link, useLocation } from 'react-router-dom';
import Slider from 'react-slick';

const Img = function (props) {
	return (
		<div className="lot-card__img">
			<img src={props.img} alt="img" />
		</div>
	);
};

const SliderItem = function (props) {
	const lbOnClick = function () {
		props.showLBox(props.ind);
	}

	return (
		<>
			<button className="lot-card__img-lb-btn" onClick={lbOnClick}></button>
			<Link to={'/cabinet/watch/' + props.id}>
				<img src={props.img} alt="img" />
			</Link>
		</>
	);
};

function LotCard(props) {
	const location = useLocation();
	const { composeValidators, required, money, autobetValidator } = useValidator();
	const [increase, { isLoading: increaseIsLoading }] = useIncreaseMutation();
	const [autobet] = useAutobetMutation();
	const { curr } = useSelector((state) => state.common);
	const dispatch = useDispatch();
	const lot = props.item;

	const [lotId, setLotId] = useState([]);

	const onParticipating = (id) => {
		setLotId([id]);
		// if (props.profile.approved && props.profile.status !== 0) {
		// } else {
		// 	dispatch(
		// 		showMessage({
		// 			title: 'Здравствуйте!',
		// 			text:
		// 				props.profile.status === 0
		// 					? 'Дилеры с демо версией не могут участвовать в аукционе.'
		// 					: 'Ваш аккаунт еще не одобрен администратором.',
		// 		})
		// 	);
		// }
	}

	const onIncrease = async (id) => {
		try {
			// await increase(id);
			dispatch(
				showMessage({
					title: 'Thanks!',
					text: 'Your bid has been accepted',
				})
			);
		} catch (error) {
			console.error(new Error(error));
			dispatch(
				showMessage({
					title: 'An error has occurred',
					text: error,
				})
			);
		}
	};

	const onAutobet = async (data) => {
		// const newData = { ...data, id: lot.id, limit: Number(data.limit), currency: curr === 'usd' ? 0 : 1 };

		try {
			// await autobet(newData);
			dispatch(
				showMessage({
					title: 'Thanks!',
					text: 'Autobet set successfully',
				})
			);
		} catch (error) {
			console.error(new Error(error));
			dispatch(
				showMessage({
					title: 'An error has occurred',
					text: error,
				})
			);
		}
	};

	const backTimer = !!lot.tradeStartsAt && !!lot.timeNow ? (lot.tradeStartsAt - lot.timeNow) / 1000 / 60 : null;

	const showLBox = function (ind) {
		dispatch(showLightbox({
			images: !!lot.clock.images ? lot.clock.images.map(item => item.file) : [],
			imgIndex: ind
		}));
	}

	let slider = [];

	if (location.pathname.includes('/cabinet') && !!lot.clock.images) {
		slider = lot.clock.images.map((item, i) => <SliderItem id={lot.clock.id} img={item.file} ind={i} showLBox={showLBox} key={item.id} />);
	}

	const sliderSettings = {
		dots: false,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1
	};

	return (
		<div className="lot-card">
			{location.pathname.includes('/for-dealers') && !!props.item && !!props.item.image && !!props.item.price && (
				<>
					<Img img={props.item.image.file} />

					<div className="lot-card__title">{'$ ' + props.item.price}</div>

					<div className="lot-card__rows">
						<div className="lot-card__rows-item">
							<span className="bold">{props.item.reference}</span>
						</div>
					</div>
				</>
			)}

			{location.pathname.includes('/cabinet') && (
				<>
					{/* <div className={"lot-card__timer" + (backTimer <= 0 ? ' lot-card__timer_hidden' : '')}>
						<p>
							Начало аукциона через <span className="semibold">{Math.floor(backTimer)}</span> мин
						</p>
					</div> */}

					<div className="lot-card__img">
						<Slider {...sliderSettings}>
							{slider}
						</Slider>
					</div>

					<div className="lot-card__title">
						<Link to={'/cabinet/watch/' + lot.clock.id}>
							{!!lot.clock.brand ? lot.clock.brand : ''}
						</Link>
					</div>
					<div className="lot-card__sub-title">{!!lot.clock.reference ? lot.clock.reference : ''}</div>
					<div className="lot-card__rows">
						<div className="lot-card__rows-item">
							Current rate:{' '}
							<span className="bold">{curr === 'usd' ? `$ ${lot.price}` : `${lot.priceUah} ₴`}</span>
						</div>
						<div className="lot-card__rows-item">
							Bet step: <span className="bold">{curr === 'usd' ? `$ ${lot.step}` : `${lot.stepUah} ₴`}</span>
						</div>
						<div className="lot-card__rows-item c-gray">
							Next bet size:{' '}
							<span className="bold">
								{curr === 'usd'
									? `$${Math.round(lot.price + lot.step)}`
									: `₴${Math.round(lot.priceUah + lot.stepUah)}`}
							</span>
						</div>
					</div>

					<div className="lot-card__bottom">
						<div className={css.form__field + ' ' + css.form__field_mt}>
							{/* (lot.participating ||  */lotId.includes(lot.id)/* ) && props.profile && props.profile.approved */ ? (
								<>
									<input
										className={classes.input}
										defaultValue={
											lot.leading
												? 'Your bet is leading'
												: curr === 'usd'
													? `$ ${lot.step}`
													: `${lot.stepUah} ₴`
										}
									/>
									<div className={css.form__field + ' ' + css.form__field_mt}>
										<button
											onClick={() => onIncrease(lot.id)}
											className={css.form__submit}
											disabled={increaseIsLoading || lot.leading}
										>
											Outbid
										</button>
									</div>
									<Form
										onSubmit={onAutobet}
										render={(props) => {
											const formClass = props.submitting ? css.form + ' ' + css.form_sending : css.form;

											return (
												<form onSubmit={props.handleSubmit} className={formClass + ' mt-32'}>
													<Field
														name="limit"
														placeholder={curr === 'usd' ? 'Auto bet limit' : 'Auto bet limit'}
														initialValue={
															curr === 'usd'
																? !!lot.autoBet
																	? lot.autoBet.limit
																	: ''
																: !!lot.autoBet
																	? lot.autoBet.limitUah
																	: ''
														}
														validate={composeValidators(
															required('*Required field'),
															money,
															autobetValidator({ price: curr === 'usd' ? lot.price : lot.priceUah })
														)}
														render={(props) => {
															return (
																<InputError {...props}>
																	<Input
																		signBefore={curr === 'usd' ? '$' : null}
																		signAfter={curr !== 'usd' ? '<span class="mSign">₴</span>' : null}
																		{...props}
																	/>
																</InputError>
															);
														}}
													/>
													<div className={css.form__field + ' ' + css.form__field_mt}>
														<button type="submit" className={css.form__submit}>
															Confirm
														</button>
													</div>
												</form>
											);
										}}
									/>
								</>
							) : (
								<button type="button" disabled={backTimer <= 0 ? false : 'disabled'} className={css.form__submit} onClick={() => onParticipating(lot.id)}>
									I want to participate
								</button>
							)}
						</div>
					</div>
				</>
			)}
		</div>
	);
}

export default LotCard;
