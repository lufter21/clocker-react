import { useEffect } from 'react';

export function useOutsideClick(ref, handler) {
	const handleOutsideClick = (event) => {
		const path = event.path || (event.composedPath && event.composedPath());
		!path.includes(ref.current) && handler();
	};

	useEffect(() => {
		document.body.addEventListener('click', handleOutsideClick);
		return () => {
			document.body.removeEventListener('click', handleOutsideClick);
		};
	}, [ref, handler]);
}
