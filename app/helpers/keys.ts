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

export const getShortcut = (e: KeyboardEvent) => {
	const { code, ctrlKey, altKey, metaKey, shiftKey } = e;
	const keys = [];
	if (ctrlKey) keys.push('ctrl');
	if (altKey) keys.push('alt');
	if (metaKey) keys.push('meta');
	if (shiftKey) keys.push('shift');
	if (code) keys.push(code);
	return keys.join('+').toLowerCase();
};
