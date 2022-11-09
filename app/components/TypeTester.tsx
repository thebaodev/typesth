import React, { forwardRef, useCallback, useEffect, useState } from 'react';
import { useInterval } from '~/hooks';

type TypeTesterProps = {
	words: string[];
	options: {
		extraLimit: number;
	};
};

const TypeTester = forwardRef<HTMLDivElement, TypeTesterProps>(
	({ words, options }: TypeTesterProps, ref) => {
		const [timer, setTimer] = useState(60);
		const [isStart, setIsStart] = useState(false);
		const [activeWord, setActiveWord] = useState(words[0]);
		const [typed, setTyped] = useState('');
		const [history, setHistory] = useState<string[]>([]);

		const handleKeyDown = useCallback(
			(e: KeyboardEvent) => {
				e.preventDefault();
				if (e.ctrlKey || e.altKey || e.metaKey || e.shiftKey) return;
				switch (e.code) {
					case 'Tab':
						break;
					case 'Space':
						if (!isStart) {
							return;
						}
						if (typed.length === 0) {
							return;
						}
						const nextWordIndex = words.indexOf(activeWord) + 1;
						const nextWord = words[nextWordIndex];
						if (!nextWord) {
							setIsStart(false);
							return;
						}
						setActiveWord(nextWord);
						debugger;
						setHistory([...history, typed]);
						setTyped('');
						break;
					case 'Backspace':
						if (typed.length === 0) {
							const prevWordIndex = words.indexOf(activeWord) - 1;
							setActiveWord(words[prevWordIndex] || '');
							setTyped(history[prevWordIndex] || '');
							setHistory(history.splice(0, history.length - 1));
							return;
						}
						const newValue = typed.slice(0, -1);
						setTyped(newValue);
						break;
					default:
						if (!isStart) {
							setIsStart(true);
						}
						if (typed.length >= activeWord.length + options.extraLimit) return;
						setTyped(typed + e.key);
				}
			},
			[activeWord, history, isStart, options.extraLimit, typed, words],
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

		useInterval(
			() => {
				if (timer === 0) {
					setIsStart(false);
				}
				setTimer(timer - 1);
			},
			isStart ? 1000 : null,
		);

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

TypeTester.defaultProps = {
	words: ['hello', 'world', 'this', 'is', 'a', 'test'],
	options: {
		extraLimit: 10,
	},
};

TypeTester.displayName = 'TypeTester';
export default TypeTester;
