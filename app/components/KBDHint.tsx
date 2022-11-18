import React, { forwardRef } from 'react';
import { Transition } from '@headlessui/react';
import clsx from 'clsx';

type KBDHintProps = {
	className?: string;
	isActive?: boolean;
};
const KBDHint = forwardRef<HTMLDivElement, KBDHintProps>(
	({ className = '', isActive = false }: KBDHintProps, ref) => {
		return (
			<section className={clsx('grid justify-center items-center h-12', className)}>
				<Transition
					show={isActive}
					enter="transition-opacity duration-400"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="transition-opacity duration-400"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="grid grid-cols-2 items-center">
						<figure>
							<kbd className="kbd">ctrl</kbd> + <kbd className="kbd">enter</kbd>
						</figure>
						<label className="text-lg font-light">restart</label>
					</div>
				</Transition>
			</section>
		);
	},
);

KBDHint.displayName = 'KBDHint';
export default KBDHint;
