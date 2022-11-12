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

type TypeTesterProps = {
	words?: string[];
	options?: {
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

		return (
			<div className="font-mono" ref={ref}>
				<div className="text-2xl text-orange-500">{timer}</div>
				<div className="text-4xl flex flex-wrap gap-2">
					{words.map((word, wordIndex) => {
						const isTypedWord = history[wordIndex];
						const isActive = wordIndex === activeIndex;
						const extraChars = isActive
							? typed.slice(word.length)
							: history[wordIndex]?.slice(word.length) || '';
						return (
							<span className="relative p-1" key={word + wordIndex}>
								{isActive && (
									<span
										ref={caretRef}
										className={clsx(
											'absolute top-0 left-0 flex bg-orange-400 w-1',
											{
												'animate-blink': !isFocus,
											},
										)}
										style={{
											height: '100%',
											left: typed.length * 22,
										}}
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
