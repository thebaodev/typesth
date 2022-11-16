import React from 'react';
import { THEMES } from '~/constant';
import { BeakerIcon } from '@heroicons/react/24/outline';

const ThemeSwitcher = () => {
	const setTheme = (theme: string) => {
		const root = document.documentElement;
		root.setAttribute('data-theme', theme);
	};

	const randomTheme = () => {
		const theme = THEMES[Math.floor(Math.random() * THEMES.length)];
		setTheme(theme.value);
	};

	return (
		<button
			className="btn border-none hover:bg-base-300 bg-base-100 flex items-center px-3 rounded-md"
			onClick={randomTheme}
		>
			<span className="flex items-end">
				<BeakerIcon className="h-6 w-6 text-base-content text-base-400" />
			</span>
		</button>
	);
};

export default ThemeSwitcher;
