const onScrollHandler = ({ selector, position }) => {
	const step = document.querySelector(selector);
	step.scrollIntoView({ behavior: 'smooth', block: position });
};

export const steps = ({ isMobile }) => [
	{
		title: 'Добро пожаловать!',
		text: ['Если хотите пройти обучение нажмите "Далее"'],
		arrow: false,
		buttons: [
			{
				classes: 'shepherd-button-secondary',
				text: 'Закрыть',
				type: 'cancel',
			},
			{
				classes: 'shepherd-button-primary',
				text: 'Далее',
				type: 'next',
			},
		],
	},
	{
		attachTo: { element: '.step-two', on: isMobile ? 'bottom' : 'right' },
		scrollTo: true,
		scrollToHandler: () => {
			isMobile
				? onScrollHandler({ selector: '.first-screen', position: 'center' })
				: onScrollHandler({ selector: '.step-two', position: 'center' });
		},
		arrow: true,
		title: 'Для участия в аукционах необходимо:',
		text: [
			'Пройти регистрацию, заполнить форму в личном кабинете во вкладке “Текущие торги”, дождаться верификации, получить уведомлении о пройденной верификации. ',
		],
		popperOptions: {
			modifiers: [{ name: 'offset', options: { offset: [0, 20] } }],
		},
		buttons: [
			{
				classes: 'shepherd-button-secondary',
				text: 'Закрыть',
				type: 'cancel',
			},
			{
				classes: 'shepherd-button-primary',
				text: 'Далее',
				type: 'next',
			},
		],
	},
	{
		attachTo: { element: '.step-three', on: isMobile ? 'top' : 'right' },
		scrollTo: true,
		scrollToHandler: () => {
			isMobile
				? onScrollHandler({ selector: '.step-three-mobile', position: 'end' })
				: onScrollHandler({ selector: '.step-three', position: 'center' });
		},
		popperOptions: {
			modifiers: [{ name: 'offset', options: { offset: [0, 30] } }],
		},
		title: 'Для участия в аукционах необходимо:',
		text: [
			'Пройти регистрацию, заполнить форму в личном кабинете во вкладке “Текущие торги”, дождаться верификации, получить уведомлении о пройденной верификации. ',
		],
		modalOverlayOpeningPadding: 10,
		buttons: [
			{
				classes: 'shepherd-button-secondary',
				text: 'Закрыть',
				type: 'cancel',
			},
			{
				classes: 'shepherd-button-primary',
				text: 'Далее',
				type: 'next',
			},
		],
	},
	{
		attachTo: { element: '.step-four', on: isMobile ? 'top' : 'right' },
		scrollTo: true,
		scrollToHandler: () => {
			isMobile
				? onScrollHandler({ selector: '.step-four-mobile', position: 'end' })
				: onScrollHandler({ selector: '.step-four', position: 'center' });
		},
		popperOptions: {
			modifiers: [{ name: 'offset', options: { offset: [0, 30] } }],
		},
		title: 'Для участия в аукционах необходимо:',
		text: [
			'Пройти регистрацию, заполнить форму в личном кабинете во вкладке “Текущие торги”, дождаться верификации, получить уведомлении о пройденной верификации. ',
		],
		modalOverlayOpeningPadding: 10,
		buttons: [
			{
				classes: 'shepherd-button',
				text: 'Закрыть',
				type: 'cancel',
			},
			{
				classes: 'shepherd-button',
				text: 'Далее',
				type: 'next',
			},
		],
	},
	{
		attachTo: { element: '.step-five', on: isMobile ? 'top' : 'right' },
		scrollTo: true,
		scrollToHandler: () => {
			isMobile
				? onScrollHandler({ selector: '.step-five-mobile', position: 'end' })
				: onScrollHandler({ selector: '.step-five', position: 'center' });
		},
		popperOptions: {
			modifiers: [{ name: 'offset', options: { offset: [0, 30] } }],
		},
		title: 'Для участия в аукционах необходимо:',
		text: [
			'Пройти регистрацию, заполнить форму в личном кабинете во вкладке “Текущие торги”, дождаться верификации, получить уведомлении о пройденной верификации. ',
		],
		modalOverlayOpeningPadding: 10,
		buttons: [
			{
				classes: 'shepherd-button',
				text: 'Закрыть',
				type: 'cancel',
			},
			{
				classes: 'shepherd-button',
				text: 'Далее',
				type: 'next',
			},
		],
	},
	{
		attachTo: { element: '.step-six', on: isMobile ? 'top' : 'right' },
		scrollTo: true,
		scrollToHandler: () => {
			isMobile
				? onScrollHandler({ selector: '.step-six-mobile', position: 'end' })
				: onScrollHandler({ selector: '.step-six', position: 'center' });
		},
		popperOptions: {
			modifiers: [{ name: 'offset', options: { offset: [0, 30] } }],
		},
		title: 'Для участия в аукционах необходимо:',
		text: [
			'Пройти регистрацию, заполнить форму в личном кабинете во вкладке “Текущие торги”, дождаться верификации, получить уведомлении о пройденной верификации. ',
		],
		modalOverlayOpeningPadding: 10,
		buttons: [
			{
				classes: 'shepherd-button',
				text: 'Закрыть',
				type: 'cancel',
			},
			{
				classes: 'shepherd-button',
				text: 'Далее',
				type: 'next',
			},
		],
	},
	{
		attachTo: { element: '.step-seven', on: isMobile ? 'top' : 'bottom' },
		scrollTo: { behavior: 'smooth', block: isMobile ? 'start' : 'end' },
		popperOptions: {
			modifiers: [{ name: 'offset', options: { offset: [0, 30] } }],
		},
		title: 'Для участия в аукционах необходимо:',
		text: [
			'Пройти регистрацию, заполнить форму в личном кабинете во вкладке “Текущие торги”, дождаться верификации, получить уведомлении о пройденной верификации. ',
		],
		buttons: [
			{
				classes: 'shepherd-button',
				text: 'Закрыть',
				type: 'cancel',
			},
			{
				classes: 'shepherd-button',
				text: 'Далее',
				type: 'next',
			},
		],
	},
	{
		attachTo: { element: '.step-eight', on: isMobile ? 'top' : 'right' },
		scrollTo: { behavior: 'smooth', block: isMobile ? 'start' : 'center' },
		popperOptions: {
			modifiers: [{ name: 'offset', options: { offset: [0, 50] } }],
		},
		title: 'История завершенных аукционов:',
		text: [
			'Вы полностью контролируете участие в торгах и всегда можете посмотреть выигранные в аукционе часы. ',
		],
		buttons: [
			{
				classes: 'shepherd-button',
				text: 'Закрыть',
				type: 'cancel',
			},
			{
				classes: 'shepherd-button',
				text: 'Далее',
				type: 'next',
			},
		],
	},
	{
		attachTo: { element: '.step-nine', on: isMobile ? 'top' : 'right' },
		scrollTo: { behavior: 'smooth', block: isMobile ? 'center' : 'center' },
		title: 'Здесь вы найдеты ответы на  популярные вопросы',
		modalOverlayOpeningPadding: 20,
		buttons: [
			{
				classes: 'shepherd-button shepherd-button_last',
				text: 'Закрыть',
				type: 'cancel',
			},
		],
	},
];

export const tourOptions = {
	defaultStepOptions: {
		classes: 'popper',
		when: {
			destroy: () => localStorage.setItem('notFirstVisit', 'true'),
		},
	},
	useModalOverlay: true,
};
