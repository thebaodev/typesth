import React, { forwardRef } from 'react';
import { TIMER_OPTIONS } from '~/constant';
import clsx from 'clsx';
import useStore from '~/store';

type TimerToggleProps = {
	className?: string;
};
const TimerToggle = forwardRef<HTMLButtonElement, TimerToggleProps>(
	({ className = '' }: TimerToggleProps, ref) => {
		const { settings, updateSettings } = useStore(state => state);

		const toggle = () => {
			const activeIndex = TIMER_OPTIONS.findIndex(
				option => option.value === timerOption.value,
			);
			const newOption = TIMER_OPTIONS[activeIndex + 1] || TIMER_OPTIONS[0];
			updateSettings({ ...settings, timer: newOption.value });
		};

		const timerOption =
			TIMER_OPTIONS.find(option => option.value === settings.timer) ||
			TIMER_OPTIONS[0];
		return (
			<button
				className={clsx(
					'btn btn-ghost font-light flex items-center rounded-lg h-12 text-lg lowercase',
					className,
				)}
				ref={ref}
				onClick={toggle}
			>
				{timerOption.label}
			</button>
		);
	},
);

TimerToggle.displayName = 'TimerToggle';
export default TimerToggle;
