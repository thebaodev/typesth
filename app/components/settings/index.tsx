import React, { forwardRef } from 'react';
import clsx from 'clsx';
import ThemeToggle from './theme-toggle';
import TimerToggle from './timer_toggle';

type SettingsProps = {
	className?: string;
};

const Settings = forwardRef<HTMLDivElement, SettingsProps>(
	({ className = '' }: SettingsProps, ref) => {
		return (
			<div className={clsx('flex p-1 bg-base-100 rounded-lg p-2', className)}>
				<TimerToggle />
				<ThemeToggle />
			</div>
		);
	},
);

Settings.displayName = 'Settings';
export default Settings;
