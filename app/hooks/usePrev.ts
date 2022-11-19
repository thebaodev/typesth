import { useEffect, useRef } from 'react';

function usePrev<T>(value: any) {
	const ref = useRef<T>(value);
	useEffect(() => {
		ref.current = value;
	}, [value]);

	return ref.current;
}

export default usePrev;
