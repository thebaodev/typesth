import React, { forwardRef } from 'react';
import { Transition } from '@headlessui/react';
import clsx from 'clsx';

type KBDHintProps = {
	className?: string;
	isActive?: boolean;
	isShowStop?: boolean;
};
const KBDHint = forwardRef<HTMLDivElement, KBDHintProps>(
	(
		{ className = '', isActive = true, isShowStop = true }: KBDHintProps,
		ref,
	) => {
		return (
			<section
				className={clsx('grid justify-center items-center', className)}
			>
				<Transition
					show={isActive}
					enter="transition-opacity ease-linear  duration-400"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="transition-opacity ease-linear  duration-400"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="grid grid-cols-[1fr_auto] items-center gap-4">
						{isShowStop && (
							<>
								<figure>
									<kbd className="kbd">ctrl</kbd> +{' '}
									<kbd className="kbd">space</kbd>
								</figure>
								<label className="text-lg font-light ml-4 text-left">
									stop
								</label>
							</>
						)}
						<figure>
							<kbd className="kbd">ctrl</kbd> + <kbd className="kbd">enter</kbd>
						</figure>
						<label className="text-lg font-light ml-4 text-left">restart</label>
					</div>
				</Transition>
			</section>
		);
	},
);

KBDHint.displayName = 'KBDHint';
export default KBDHint;
