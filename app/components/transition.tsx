import React, { forwardRef } from 'react';
import clsx from 'clsx';
import { Transition as TransitionBase } from '@headlessui/react';

type TransitionProps = {
	className?: string;
	children: React.ReactNode;
	show: boolean;
	appear?: boolean;
};
const Transition = forwardRef<HTMLDivElement, TransitionProps>(
	(
		{ className = '', children, show, appear = false }: TransitionProps,
		ref,
	) => {
		return (
			<TransitionBase
				ref={ref}
				className={clsx('', className)}
				show={show}
				appear={appear}
				enter="transition-opacity ease-linear duration-600"
				enterFrom="opacity-0"
				enterTo="opacity-100"
				leave="transition-opacity ease-linear duration-600"
				leaveFrom="opacity-100"
				leaveTo="opacity-0"
			>
				{children}
			</TransitionBase>
		);
	},
);

export default Transition;
