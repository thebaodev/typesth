import { useCallback, useEffect, useRef } from 'react';

export const useInterval = (callback: Function, delay: number | null) => {
	const callbackRef = useRef(callback);

	const tick = useCallback(() => {
		callbackRef.current();
	}, []);

	useEffect(() => {
		callbackRef.current = callback;
	}, [callback]);

	useEffect(() => {
		if (!delay) return;
		const id = setInterval(tick, delay);
		return () => clearInterval(id);
	}, [delay, tick]);
};
