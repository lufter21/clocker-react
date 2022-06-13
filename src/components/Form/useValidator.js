function useValidator() {
	return {
		composeValidators: (...validators) => {
			return (value) => validators.reduce((error, validator) => error || validator(value), undefined);
		},
		required: (errTxt) => {
			return (value) => (value ? undefined : errTxt);
		},
		phoneNumber: (value) => {
			return /^\+?\d{11}$/.test(value) ? undefined : 'Please enter a correct phone number';
		},
		email: (value) => {
			return /^[a-z0-9]+[\w.-]*@([\w-]{2,}\.)+[a-z]{2,}$/i.test(value) ? undefined : 'Enter a correct email';
		},
		money: (value) => {
			return /^\d+[.|,]?\d{0,2}$/.test(value) ? undefined : 'Enter a correct amount';
		},
		httpLink: (value) => {
			return /^(http|https):\/\/.+$/.test(value) ? undefined : 'Enter a correct url';
		},
		autobetValidator: ({ price }) => {
			return (value) =>
				Number(value) < price ? 'The autobet limit cannot be less than the current bet' : undefined;
		},
		maxLength1000: (value) => {
			return /^.{0,1000}$/.test(value) ? undefined : 'Enter less than 1000 characters';
		},
		maxLength64: (value) => {
			return /^.{0,64}$/.test(value) ? undefined : 'Enter less than 64 characters';
		},
	};
}

export default useValidator;
