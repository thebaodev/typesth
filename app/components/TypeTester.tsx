import React, {
	forwardRef,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react';
import { getShortcut, isFunctionKeys } from '~/helpers/keys';
import { KEYCODES, SHORTCUTS } from '~/constant';
import { useInterval } from '~/hooks/useInterval';
import clsx from 'clsx';
import anime from 'animejs';

type TypeTesterProps = {
	words?: string[];
	options?: {
		fontSize: number;
		showLines: number;
		extraLimit: number;
	};
};
const TypeTester = forwardRef<HTMLDivElement, TypeTesterProps>(
	(
		{
			words = [
				'hello',
				'world',
				'this',
				'is',
				'a',
				'test',
				'of',
				'the',
				'lorem',
				'ipsum',
				'dolor',
				'sit',
				'amet',
				'consectetur',
				'adipiscing',
				'elit',
				'sed',
				'do',
				'eiusmod',
				'tempor',
				'incididunt',
				'ut',
				'consectetur',
				'adipiscing',
				'elit',
				'sed',
				'do',
				'eiusmod',
				'tempor',
				'incididunt',
				'ut',
				'consectetur',
				'adipiscing',
				'elit',
				'sed',
				'do',
				'eiusmod',
				'tempor',
				'incididunt',
				'ut',
				'consectetur',
				'adipiscing',
				'elit',
				'sed',
				'do',
				'eiusmod',
				'tempor',
				'incididunt',
				'ut',
			],
			options = {
				fontSize: 48,
				showLines: 3,
				extraLimit: 10,
			},
		}: TypeTesterProps,
		ref,
	) => {
		const [timer, setTimer] = useState(0);
		const [isStart, setIsStart] = useState(false);
		const [isFocus, setIsFocus] = useState(false);
		const [activeIndex, setActiveIndex] = useState(0);
		const [typed, setTyped] = useState('');
		const [history, setHistory] = useState<string[]>([]);
		const caretRef = useRef<HTMLSpanElement>(null);

		const start = () => {
			setIsStart(true);
			setIsFocus(true);
			setActiveIndex(0);
		};

		const stop = () => {
			setIsStart(false);
			setIsFocus(false);
		};

		const restart = () => {
			setIsStart(false);
			setActiveIndex(0);
			setTyped('');
			setHistory([]);
			setTimer(0);
		};

		useInterval(
			() => {
				setTimer(timer + 1);
			},
			isStart ? 1000 : null,
		);

		const handleShortcuts = useCallback((e: KeyboardEvent) => {
			const shortcut = getShortcut(e);
			if (!shortcut) return;
			switch (shortcut) {
				case SHORTCUTS.restart:
					restart();
					break;
			}
		}, []);

		const handleNextWord = useCallback(
			(nextIndex: number) => {
				if (!isStart) {
					return;
				}
				setActiveIndex(nextIndex);
				setHistory([...history, typed]);
				setTyped('');
			},
			[history, isStart, typed],
		);

		const handlePrevWord = useCallback(
			(prevIndex: number) => {
				if (!isStart) {
					return;
				}
				setActiveIndex(prevIndex);
				setTyped(history[prevIndex] || '');
				setHistory(history.splice(0, history.length - 1));
			},
			[history, isStart],
		);

		const caretDirection = useRef('forward');
		const handleCaretPosition = useCallback(() => {
			const caret = caretRef.current;
			if (!caret) return;
			anime({
				targets: caret,
				duration: 120,
				opacity: 1,
				left: typed.length * 30,
				easing: 'linear',
			});
		}, [typed.length]);

		useEffect(() => {
			handleCaretPosition();
		}, [handleCaretPosition]);

		const handleKeyDown = useCallback(
			(e: KeyboardEvent) => {
				e.preventDefault();
				handleShortcuts(e);
				switch (e.code) {
					case KEYCODES.SPACE:
						if (typed.length > 0) {
							const nextWordIndex = activeIndex + 1;
							if (nextWordIndex < 0) {
								stop();
								return;
							}
							handleNextWord(nextWordIndex);
							caretDirection.current = 'forward';
						}
						break;
					case KEYCODES.BACKSPACE:
						if (typed.length === 0) {
							const prevWordIndex = activeIndex - 1;
							if (prevWordIndex < 0) {
								stop();
								return;
							}
							handlePrevWord(prevWordIndex);
							caretDirection.current = 'backward';
							return;
						}
						const newValue = typed.slice(0, -1);
						setTyped(newValue);
						break;
					default:
						if (isFunctionKeys(e)) return;
						if (!isStart) {
							start();
						}
						if (typed.length >= words[activeIndex].length + options.extraLimit)
							return;
						setTyped(typed + e.key);
				}
			},
			[
				activeIndex,
				handleNextWord,
				handlePrevWord,
				handleShortcuts,
				isStart,
				options.extraLimit,
				typed,
				words,
			],
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

		const lineHeight = options?.fontSize * 1.2 + 12; // 12 gap
		return (
			<div
				className="w-2/3 flex flex-col flex-wrap items-start justify-center font-mono"
				ref={ref}
			>
				<div className="text-3xl text-orange-500">{timer}</div>
				<div
					className="h-full w-full overflow-hidden text-5xl flex flex-wrap gap-2"
					style={{
						maxHeight: `${lineHeight * options.showLines}px`,
					}}
				>
					{words.map((word, wordIndex) => {
						const isTypedWord = history[wordIndex];
						const isActive = wordIndex === activeIndex;
						const extraChars = isActive
							? typed.slice(word.length)
							: history[wordIndex]?.slice(word.length) || '';
						return (
							<span
								className="relative px-1 h-full leading-none"
								key={word + wordIndex}
								style={{
									fontSize: `${options.fontSize}px`,
									height: `${lineHeight}px`,
								}}
							>
								{isActive && (
									<span
										ref={caretRef}
										className={clsx(
											'absolute opacity-0 -top-6 h-full flex bg-orange-400 w-1 rounded-lg',
											{
												'animate-blink': !isFocus,
												'left-0': caretDirection.current === 'forward',
												'right-0': caretDirection.current === 'backward',
											},
										)}
									/>
								)}
								{word.split('').map((char, charIndex) => {
									const isTypedChar =
										isTypedWord || (isActive && typed[charIndex]);
									let isCorrect = false;
									if (isTypedWord) {
										isCorrect = history[wordIndex][charIndex] === char;
									} else if (isTypedChar) {
										isCorrect = typed[charIndex] === char;
									}
									return (
										<span
											key={char + charIndex}
											className={clsx({
												'text-gray-500': !isTypedChar,
												'text-green-500': isTypedChar && isCorrect,
												'text-red-500': isTypedChar && !isCorrect,
											})}
										>
											{char}
										</span>
									);
								})}
								<span>
									{extraChars &&
										extraChars.split('').map((char, charIndex) => (
											<span key={char + charIndex} className="text-red-500">
												{char}
											</span>
										))}
								</span>
							</span>
						);
					})}
				</div>
			</div>
		);
	},
);

TypeTester.displayName = 'TypeTester';
export default TypeTester;
