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

		const calculateAccuracy = useCallback(() => {
			const { words, typed } = data;
			let errors = 0;
			for (let i = 0; i < typed.length; i++) {
				if (!words[i]) {
					errors++;
					return;
				}
				if (typed[i] !== words[i]) {
					for (let j = 0; j < typed[i].length; j++) {
						if (typed[i][j] !== words[i][j]) {
							errors++;
						}
					}
				}
			}
			const typedString = typed.join(' ');
			let correctCharacters = typedString.length - errors;
			return Math.floor((correctCharacters / typedString.length) * 100) / 100;
		}, [data]);

		const calculate = useCallback(() => {
			const { typed, time } = data;
			const typedString = typed.join(' ');
			const cpm = Math.round((typedString.length / data.time) * 60);
			const wpm = Math.round((typedString.length / 5 / data?.time) * 60);
			const accuracy = calculateAccuracy() || 0;
			return { cpm, wpm, accuracy, time };
		}, [calculateAccuracy, data]);

		const { cpm, wpm, accuracy, time } = calculate();
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
								{accuracy * 100}%
							</div>
							{/*<div className="stat-desc text-md md:text-lg lg:text-xl">*/}
							{/*	your acc ↗︎ 40 (2%)*/}
							{/*</div>*/}
						</div>
						<div className="stat border-l md:border-l-0" onClick={toggleCPM}>
							<div className="stat-title mb-4 text-3xl md:text-4xl lg:text-6xl">
								{showCPM ? 'cpm' : 'wpm'}
							</div>
							<div className="stat-value text-2xl md:text-3xl lg:text-5xl mb-4">
								{showCPM ? cpm : wpm}
							</div>
							{/*<div className="stat-desc text-md md:text-lg lg:text-xl">*/}
							{/*	your speed ↗︎ 40 (2%)*/}
							{/*</div>*/}
						</div>
						<div className="stat">
							<div className="stat-title mb-4 text-3xl md:text-4xl lg:text-6xl">
								you typed
							</div>
							<div className="stat-value text-2xl md:text-3xl lg:text-5xl mb-4">
								{time}s
							</div>
							{/*<div className="stat-desc text-md md:text-lg lg:text-xl">*/}
							{/*	keep it going!*/}
							{/*</div>*/}
						</div>
					</div>
				</div>
			</Transition>
		);
	},
);

TestResult.displayName = 'TestResult';
export default TestResult;
