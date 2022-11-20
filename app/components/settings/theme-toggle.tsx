import React from 'react';
import { THEMES } from '~/constant';
import { BeakerIcon } from '@heroicons/react/24/outline';

const ThemeToggle = () => {
	const setTheme = (theme: string) => {
		const root = document.documentElement;
		root.setAttribute('data-theme', theme);
	};

	const randomTheme = () => {
		const themes = Object.values(THEMES);
		const theme = themes[Math.floor(Math.random() * themes.length)];
		setTheme(theme.value);
	};

	return (
		<button
			className="btn btn-ghost flex items-center rounded-lg"
			onClick={randomTheme}
		>
			<span className="flex items-end">
				<BeakerIcon className="h-6 w-6 text-base-content text-base-400" />
			</span>
		</button>
	);
};

export default ThemeToggle;
