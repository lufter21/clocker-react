import './DealerBoard.scss';
import css from '../Form/Form.module.scss';
import { Field, Form } from 'react-final-form';
import InputError from '../Form/InputError/InputError';
import Input from '../Form/Input/Input';
import { useState } from 'react';

function DbInvite(props) {
	const [refererLink, setRefererLink] = useState('https://');
	const [hidden, setHidden] = useState(true);

	const toggleHidden = function () {
		setHidden(!hidden);
	};

	const btnClName = hidden ? 'dealer-board__top-toggle' : 'dealer-board__top-toggle active';
	const hiddenBlockClName = hidden
		? 'dealer-board__bottom dealer-board-hidden'
		: 'dealer-board__bottom dealer-board-hidden active';

	const onSubmit = (data, form) => {
		if (!!props.profileData) {
			setRefererLink(props.profileData.refererLink);
			form.reset();
		}
	};

	return (
		<div className="dealer-board__block">
			<div className="dealer-board__top">
				<button className={btnClName} onClick={toggleHidden}>
					Invitations
				</button>
			</div>

			<div className={hiddenBlockClName}>
				<Form
					onSubmit={onSubmit}
					render={(props) => {
						return (
							<form onSubmit={props.handleSubmit} className={css.form + ' mt-32'}>
								<Field
									name="invite_url"
									placeholder="https://"
									initialValue={refererLink}
									render={(props) => <InputError children={<Input {...props} />} {...props} />}
								/>
								<div className={css.form__row}>
									<button type="submit" className={css.form__submit}>
										Invite a dealer
									</button>
								</div>
							</form>
						);
					}}
				/>
			</div>
		</div>
	);
}

export default DbInvite;
