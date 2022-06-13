import './DealerBoard.scss';
import css from '../Form/Form.module.scss';
import { Field, Form } from 'react-final-form';
import InputError from '../Form/InputError/InputError';
import Input from '../Form/Input/Input';
import CurrencyButtons from '../Button/CurrencyButtons';
import useValidator from '../Form/useValidator';
import { useSelector } from 'react-redux';

function DbDeposit(props) {
	const { curr } = useSelector((state) => state.common);
	const { composeValidators, required, money } = useValidator();

	return (
		<div className="dealer-board__block">
			<div className="dealer-board__top">
				Deposit
				<CurrencyButtons />
			</div>
			{!!props.profileData && (
				<div className="dealer-board__deposit">
					{curr === 'usd'
						? !!props.profileData.deposit
							? props.profileData.deposit
							: '0'
						: !!props.profileData.depositUah
						? props.profileData.depositUah
						: '0'}{' '}
					<span className="mSign">{curr === 'usd' ? '$' : '₴'}</span>
				</div>
			)}
			{!!props.paymentsData && !!props.paymentsData.show && (
				<div className="dealer-board__bottom">
					<Form
						onSubmit={props.withdrawDeposit}
						render={(props) => {
							const formClass = props.submitting ? css.form + ' ' + css.form_sending : css.form;

							return (
								<form onSubmit={props.handleSubmit} className={formClass}>
									<div className="row row_gap10">
										<div className="col-6 sm-col-4">
											<Field
												name="withdraw"
												placeholder="0 $"
												validate={composeValidators(required('*Required field'), money)}
												render={(props) => <InputError children={<Input {...props} />} {...props} />}
											/>
										</div>
										<div className="col-6 sm-col-8">
											<button type="submit" className={css.form__submit}>
												Withdraw
											</button>
										</div>
									</div>
								</form>
							);
						}}
					/>
					<div className={css.form__row}>
						<button className="btn" onClick={props.makeDeposit}>
							Make a deposit
						</button>
					</div>
				</div>
			)}
		</div>
	);
}

export default DbDeposit;
