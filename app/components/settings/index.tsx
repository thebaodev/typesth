import React, { forwardRef } from 'react';
import clsx from 'clsx';

import ThemeToggle from './theme-toggle';
import TimerToggle from './timer_toggle';
import type { getUser } from '~/utils/session.server';

type SettingsProps = {
	user?: Awaited<ReturnType<typeof getUser>>;
	className?: string;
};

const Settings = forwardRef<HTMLDivElement, SettingsProps>(
	({ className = '', user }: SettingsProps, ref) => {
		return (
			<div className={clsx('flex gap-2', className)}>
				<TimerToggle />
				<ThemeToggle />
				<div className="avatar placeholder">
					<div className="bg-neutral-focus text-neutral-content rounded-full w-12">
						<span className="text-xs">{user?.username}</span>
					</div>
				</div>
			</div>
		);
	},
);

Settings.displayName = 'Settings';
export default Settings;
