import React, { forwardRef, useCallback, useEffect, useState } from 'react';
import clsx from 'clsx';
import { Transition } from '@headlessui/react';
import { getShortcut } from '~/helpers/keys';
import { SHORTCUTS } from '~/constant';

type TestResultProps = {
	isActive?: boolean;
	className?: string;
	data?: {
		words: string[];
		typed: string[];
		time: number;
	};
	callbacks?: {
		onRestart?: () => void;
	};
};
const TestResult = forwardRef<HTMLDivElement, TestResultProps>(
	(
		{
			isActive = false,
			className = '',
			data = {
				words: [],
				typed: [],
				time: 30,
			},
			callbacks = {
				onRestart: () => {},
			},
		}: TestResultProps,
		ref,
	) => {
		const [showCPM, setShowCPM] = useState(false);
		const { words, typed, time } = data;
		console.log({ words, typed, time });
		const charTyped = (data.typed.join('') || '').length;
		const cpm = Math.round((charTyped / data.time) * 60);
		const wpm = Math.round((charTyped / 5 / data?.time) * 60);

		const toggleCPM = () => {
			setShowCPM(!showCPM);
		};

		const handleKeyDown = useCallback(
			(e: KeyboardEvent) => {
				e.preventDefault();
				const shortcut = getShortcut(e);
				if (!shortcut) return;
				switch (shortcut) {
					case SHORTCUTS.restart:
						if (callbacks?.onRestart) {
							callbacks.onRestart();
						}
						break;
					default:
						break;
				}
			},
			[callbacks],
		);

		const attachEventListeners = useCallback(() => {
			document.addEventListener('keydown', handleKeyDown);
		}, [handleKeyDown]);

		const removeEventListeners = useCallback(() => {
			document.removeEventListener('keydown', handleKeyDown);
		}, [handleKeyDown]);

		useEffect(() => {
			attachEventListeners();
			return () => {
				removeEventListeners();
			};
		}, [attachEventListeners, removeEventListeners]);

		return (
			<Transition
				show={isActive}
				enter="transition-opacity ease-linear duration-600"
				enterFrom="opacity-0"
				enterTo="opacity-100"
				leave="transition-opacity ease-linear duration-600"
				leaveFrom="opacity-100"
				leaveTo="opacity-0"
			>
				<div ref={ref} className={clsx('p-1 text-center', className)}>
					<div className="stats grid-cols-1 grid-rows-3 md:grid-cols-3 md:grid-rows-1">
						<div className="stat">
							<div className="stat-title mb-4 text-2xl md:text-3xl lg:text-6xl">
								accuracy
							</div>
							<div className="stat-value text-2xl md:text-3xl lg:text-5xl mb-4">
								89%
							</div>
							<div className="stat-desc text-md md:text-lg lg:text-xl">
								your acc ↗︎ 40 (2%)
							</div>
						</div>
						<div className="stat border-l md:border-l-0" onClick={toggleCPM}>
							<div className="stat-title mb-4 text-3xl md:text-4xl lg:text-6xl">
								{showCPM ? 'cpm' : 'wpm'}
							</div>
							<div className="stat-value text-2xl md:text-3xl lg:text-5xl mb-4">
								{showCPM ? cpm : wpm}
							</div>
							<div className="stat-desc text-md md:text-lg lg:text-xl">
								your speed ↗︎ 40 (2%)
							</div>
						</div>
						<div className="stat">
							<div className="stat-title mb-4 text-3xl md:text-4xl lg:text-6xl">
								you typed
							</div>
							<div className="stat-value text-2xl md:text-3xl lg:text-5xl mb-4">
								45s
							</div>
							<div className="stat-desc text-md md:text-lg lg:text-xl">
								great job!
							</div>
						</div>
					</div>
				</div>
			</Transition>
		);
	},
);

TestResult.displayName = 'TestResult';
export default TestResult;
