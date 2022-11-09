import { KEYCODES } from '~/constant';

export const isFunctionKeys = (e: KeyboardEvent) => {
	const { code } = e;
	return (
		Object.values(KEYCODES).includes(code) ||
		e.ctrlKey ||
		e.altKey ||
		e.metaKey ||
		e.shiftKey
	);
};

export const getShortcut = (e: KeyboardEvent) => {
	const { key, ctrlKey, altKey, metaKey, shiftKey } = e;
	const keys = [];
	if (ctrlKey) keys.push('ctrl');
	if (altKey) keys.push('alt');
	if (metaKey) keys.push('meta');
	if (shiftKey) keys.push('shift');
	if (key) keys.push(key);
	return keys.join('+').toLowerCase();
};
