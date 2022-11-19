import React, { forwardRef } from 'react';
import clsx from 'clsx';
import { Transition } from '@headlessui/react';
import {TIMER_OPTIONS} from "~/constant";

type MenuProps = {
	isShow?: boolean;
	className?: string;
	callbacks?: {
		onTimerChange: (timer: number) => void;
	};
};

const Menu = forwardRef<HTMLDivElement, MenuProps>(
	(
		{
			isShow = true,
			className = '',
			callbacks = { onTimerChange: () => TIMER_OPTIONS[0].value },
		}: MenuProps,
		ref,
	) => {
		const [timerOption, setTimerOption] = React.useState<{
			value: number;
			label: string | JSX.Element;
		}>(TIMER_OPTIONS[0]);

		const toggleTimerOption = () => {
			const activeIndex = TIMER_OPTIONS.findIndex(
				option => option.value === timerOption.value,
			);
			const newOption = TIMER_OPTIONS[activeIndex + 1] || TIMER_OPTIONS[0];
			setTimerOption(newOption);
			if (callbacks?.onTimerChange) callbacks.onTimerChange(newOption.value);
		};

		return (
			<Transition
				show={isShow}
				appear={true}
				ref={ref}
				className={clsx('p-1 bg-base-100 rounded-lg p-2', className)}
				enter="transition-transform ease-linear duration-800"
				enterFrom="translate-x-16"
				enterTo="translate-x-0"
				leave="transition-transform ease-linear duration-800"
				leaveFrom="translate-x-0"
				leaveTo="translate-x-16"
			>
				<button
					className="btn btn-ghost font-light flex items-center rounded-lg h-12 w-14"
					onClick={toggleTimerOption}
				>
					{timerOption.label}
				</button>
			</Transition>
		);
	},
);

export default Menu;
