import { KEYCODES } from '~/constant';

export const isFunctionKeys = (e: KeyboardEvent) => {
	const { code } = e;
	return (
		Object.values(KEYCODES).includes(code) ||
		e.ctrlKey ||
		e.ctrlKey ||
		e.altKey ||
		e.metaKey ||
		e.shiftKey
	);
};
