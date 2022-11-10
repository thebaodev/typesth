import React, { forwardRef, useCallback, useEffect, useState } from 'react';
import { getShortcut, isFunctionKeys } from '~/helpers/keys';
import { KEYCODES, SHORTCUTS } from '~/constant';
import { useInterval } from '~/hooks/useInterval';

type TypeTesterProps = {
	words?: string[];
	options?: {
		extraLimit: number;
	};
};

const TypeTester = forwardRef<HTMLDivElement, TypeTesterProps>(
	(
		{
			words = ['hello', 'world', 'this', 'is', 'a', 'test'],
			options = {
				extraLimit: 10,
			},
		}: TypeTesterProps,
		ref,
	) => {
		const [timer, setTimer] = useState(0);
		const [isStart, setIsStart] = useState(false);
		const [activeWord, setActiveWord] = useState('');
		const [typed, setTyped] = useState('');
		const [history, setHistory] = useState<string[]>([]);

		const start = () => {
			setIsStart(true);
			setActiveWord(words[0] || '');
		};

		const stop = () => {
			setIsStart(false);
		};

		const restart = () => {
			setIsStart(false);
			setActiveWord('');
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

		const handleNextWord = (nextIndex: number) => {
			if (!isStart) {
				return;
			}
			setActiveWord(words[nextIndex]);
			setHistory([...history, typed]);
			setTyped('');
		};

		const handlePrevWord = (prevIndex: number) => {
			if (!isStart) {
				return;
			}
			setActiveWord(words[prevIndex]);
			setTyped(history[prevIndex] || '');
			setHistory(history.splice(0, history.length - 1));
		};

		const handleKeyDown = useCallback(
			(e: KeyboardEvent) => {
				e.preventDefault();
				handleShortcuts(e);
				switch (e.code) {
					case KEYCODES.SPACE:
						if (typed.length > 0) {
							const nextWordIndex = words.indexOf(activeWord) + 1;
							if (nextWordIndex < 0) {
								stop();
								return;
							}
							handleNextWord(nextWordIndex);
						}
						break;
					case KEYCODES.BACKSPACE:
						if (typed.length === 0) {
							const prevWordIndex = words.indexOf(activeWord) - 1;
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
						if (typed.length >= activeWord.length + options.extraLimit) return;
						setTyped(typed + e.key);
				}
			},
			[
				activeWord,
				handleNextWord,
				handlePrevWord,
				handleShortcuts,
				isStart,
				options.extraLimit,
				start,
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
			<div ref={ref}>
				<div className="text-2x text-emerald-800">{timer}</div>
				<div className="text-4xl flex flex-wrap gap-2">
					{words.map((word, wordIndex) => {
						const isTypedWord = history[wordIndex];
						const isActive = word === activeWord;
						const extraChars = isActive
							? typed.slice(activeWord.length)
							: history[wordIndex]?.slice(word.length) || '';
						return (
							<span key={word + wordIndex}>
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
											className={
												!isTypedChar
													? 'text-gray-500'
													: isCorrect
													? 'text-green-500'
													: 'text-red-500'
											}
											key={char + charIndex}
										>
											{char}
										</span>
									);
								})}
								<span>
									{extraChars &&
										extraChars.split('').map((char, charIndex) => (
											<span className="text-red-500" key={char + charIndex}>
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
