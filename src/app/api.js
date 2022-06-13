export function userAuthApi(data) {
	return new Promise((resolve) => {
		setTimeout(function () {
			if (data.confirm_code) {
				resolve({
					id: Date.now(),
					role: data.confirm_code !== 1 ? 'dealer' : 'seller',
					city: 'Lviv',
					name: '',
					deposit: {
						rub: 20000,
						usd: 350,
					},
					settings: {
						notification: ['winner'],
					},
				});
			} else {
				resolve();
			}
		}, 2000);
	});
}

/**
 * Update User
 */
export function updateUserDataApi(data) {
	return new Promise((resolve) => {
		setTimeout(function () {
			if (data.deposit_form) {
			}
			if (data.notification) {
				resolve({
					settings: {
						notification: data.notification,
					},
				});
			} else {
				resolve();
			}
		}, 2000);
	});
}

/**
 * Deposit
 */
export function makeDepositApi(data) {
	return new Promise((resolve) => {
		setTimeout(function () {
			if (data.deposit) {
				resolve({
					rub: data.deposit,
					usd: (data.deposit / 74).toFixed(0),
				});
			} else {
				resolve();
			}
		}, 2000);
	});
}

/**
 * Withdraw
 */
export function sendWithdrawForm(data) {
	return new Promise((resolve) => {
		setTimeout(function () {
			resolve();
		}, 2000);
	});
}

/**
 * PLACE A BET
 */
export function placeBet(data) {
	return new Promise((resolve) => {
		setTimeout(function () {
			resolve();
		}, 2000);
	});
}
