import React, { forwardRef, useCallback, useEffect, useState } from 'react';

type TypeTesterProps = {
	words?: string[];
};

const defaultWords = ['hello', 'world', 'this', 'is', 'a', 'test'];
const TypeTester = forwardRef<HTMLDivElement, TypeTesterProps>(
	({ words = defaultWords }: TypeTesterProps, ref) => {
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
						const nextWordIndex = words.indexOf(activeWord) + 1;
						setActiveWord(words[nextWordIndex] || '');
						setTyped('');
						setHistory([...history, typed]);
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
						setTyped(typed + e.key);
				}
			},
			[activeWord, history, typed, words],
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

		console.log({ typed });
		const extraChars = typed.slice(activeWord.length);
		return (
			<div ref={ref}>
				<div className="text-4xl flex flex-wrap gap-2">
					{words.map((word, wordIndex) => {
						const isTypedWord = history[wordIndex];
						const isActive = word === activeWord;
						console.log({ isTypedWord, isActive });
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
									{isActive &&
										extraChars &&
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
