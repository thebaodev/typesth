import React, {
	forwardRef,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react';
import clsx from 'clsx';
import anime from 'animejs';
import { KEYCODES, SHORTCUTS, TIMER_ENDLESS, TIMER_OPTIONS } from '~/constant';
import { useInterval } from '~/hooks/useInterval';
import { getShortcut, isFunctionKeys } from '~/helpers/keys';
import { Transition } from '@headlessui/react';
import usePrev from '~/hooks/usePrev';
import defaultWords from '~/data/default-words.json';

type TypeTesterProps = {
	isActive: boolean;
	className?: string;
	words?: string[];
	options?: {
		fontSize: number;
		timer: number;
		showLines: number;
		extraLimit: number;
	};
	callbacks?: {
		onStarted: () => void;
		onFinished: (words: string[], typed: string[], time: number) => void;
		onRestart: () => void;
	};
};
const TypeTester = forwardRef<HTMLDivElement, TypeTesterProps>(
	(
		{
			isActive = true,
			className = '',
			words = defaultWords.data,
			options = {
				fontSize: 56,
				timer: TIMER_OPTIONS[0].value,
				showLines: 3,
				extraLimit: 10,
			},
			callbacks = {
				onStarted: () => {},
				onFinished: () => {},
				onRestart: () => {},
			},
		}: TypeTesterProps,
		ref,
	) => {
		const [timer, setTimer] = useState(options.timer);
		const [isStart, setIsStart] = useState(false);
		const [isFocus, setIsFocus] = useState(false);
		const [activeIndex, setActiveIndex] = useState(0);
		const [typed, setTyped] = useState('');
		const [history, setHistory] = useState<string[]>([]);
		const [hiddenIndexes, setHiddenIndexes] = useState<number[]>([]);
		const activeRowIndexRef = useRef<number>(0);
		const typeViewRef = useRef<HTMLDivElement>(null);
		const caretRef = useRef<HTMLSpanElement>(null);
		const caretDirectionRef = useRef('');
		const lineHeight = options.fontSize * 1.25;
		const viewHeight = lineHeight * options.showLines;

		const start = useCallback(() => {
			setIsStart(true);
			setIsFocus(true);
			setActiveIndex(0);
			if (callbacks?.onStarted) {
				callbacks.onStarted();
			}
		}, [callbacks]);

		const stop = useCallback(() => {
			setIsStart(false);
			setIsFocus(false);
			if (callbacks?.onFinished) {
				const newHistory = [...history, typed];
				const time = options.timer === TIMER_ENDLESS ? timer : options.timer;
				callbacks.onFinished(words, newHistory, time);
			}
		}, [callbacks, history, options.timer, timer, typed, words]);

		const restart = useCallback(() => {
			setIsStart(false);
			setActiveIndex(0);
			setTyped('');
			setHistory([]);
			setHiddenIndexes([]);
			setTimer(options.timer);
			if (callbacks?.onRestart) {
				callbacks.onRestart();
			}
		}, [callbacks, options.timer]);

		const prevTimerOption = usePrev(options.timer);
		useEffect(() => {
			if (prevTimerOption !== options.timer) {
				setTimer(options.timer);
				restart();
			}
		}, [options, prevTimerOption, restart]);

		useInterval(
			() => {
				if (options.timer === TIMER_ENDLESS) {
					setTimer(timer + 1);
				} else {
					if (timer === 0) {
						stop();
						return;
					}
					setTimer(timer - 1);
				}
			},
			isStart ? 1000 : null,
		);

		const handleShortcuts = useCallback(
			(e: KeyboardEvent) => {
				e.preventDefault();
				e.stopPropagation();
				const shortcut = getShortcut(e);
				if (!shortcut) return;
				switch (shortcut) {
					case SHORTCUTS.restart:
						restart();
						break;
					case SHORTCUTS.stop:
						stop();
						break;
					default:
						break;
				}
			},
			[restart, stop],
		);

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
				if (!isStart || hiddenIndexes.includes(prevIndex)) {
					return;
				}
				setActiveIndex(prevIndex);
				setTyped(history[prevIndex] || '');
				setHistory(history.splice(0, history.length - 1));
			},
			[hiddenIndexes, history, isStart],
		);

		const removeCompletedRows = useCallback(() => {
			const typeView = typeViewRef.current;
			const activeRowIndex = activeRowIndexRef.current;
			if (!typeView || activeRowIndex === 0) return;
			const typeViewRect = typeView.getBoundingClientRect();
			const wordEls = typeView.querySelectorAll('.word');
			const completedIndexes: number[] = [];
			Array.from(wordEls).every((wordEl: Element, index) => {
				const wordRect = wordEl.getBoundingClientRect();
				const wordRowIndex = (wordRect.top - typeViewRect.top) / lineHeight;
				if (wordRowIndex > 0) {
					return false;
				}
				completedIndexes.push(index);
				return true;
			});
			setHiddenIndexes([...hiddenIndexes, ...completedIndexes]);
		}, [hiddenIndexes, lineHeight]);

		const handleCaretPosition = useCallback(() => {
			const caret = caretRef.current;
			const typeView = typeViewRef.current;
			if (!caret || !typeView) return;
			const letterSpace = options.fontSize * (34 / 56);
			anime({
				targets: caret,
				duration: 100,
				left: typed.length * letterSpace, // letter space ratio
				easing: 'linear',
			});
			const caretRect = caret.getBoundingClientRect();
			const typeViewRect = typeView.getBoundingClientRect();
			const shouldHidePreviousLine =
				typeViewRect.height >= lineHeight * options.showLines;
			if (!shouldHidePreviousLine) return;
			const activeRowIndex = (caretRect.top - typeViewRect.top) / lineHeight;
			activeRowIndexRef.current = activeRowIndex;
			if (activeRowIndex > 1) {
				removeCompletedRows();
			}
		}, [
			options.fontSize,
			options.showLines,
			typed.length,
			lineHeight,
			removeCompletedRows,
		]);

		useEffect(() => {
			handleCaretPosition();
		}, [handleCaretPosition]);

		const handleKeyDown = useCallback(
			(e: KeyboardEvent) => {
				e.preventDefault();
				handleShortcuts(e);
				const lastWord = words[words.length - 1];
				const isLastWord = activeIndex === words.length - 1;
				switch (e.code) {
					case KEYCODES.SPACE:
						if (typed.length > 0) {
							const nextWordIndex = activeIndex + 1;
							if (nextWordIndex <= 0) {
								stop();
								return;
							}
							handleNextWord(nextWordIndex);
							caretDirectionRef.current = 'forward';
						}
						if (isLastWord) {
							stop();
						}
						break;
					case KEYCODES.BACKSPACE:
						if (typed.length === 0) {
							const prevWordIndex = activeIndex - 1;
							if (prevWordIndex <= 0) {
								return;
							}
							handlePrevWord(prevWordIndex);
							caretDirectionRef.current = 'backward';
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
						if (typed.length >= words[activeIndex]?.length + options.extraLimit)
							return;
						const newTyped = typed + e.key;
						setTyped(newTyped);
						if (isLastWord && newTyped === lastWord) {
							stop();
						}
				}
			},
			[activeIndex, handleNextWord, handlePrevWord, handleShortcuts, isStart, options.extraLimit, start, stop, typed, words],
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

		const filteredWords = words?.slice(hiddenIndexes.length, words?.length);
		return (
			<div
				className={clsx(
					'grid grid-rows-[auto_1fr] font-mono h-full mt-24 md:h-auto md:mt-auto',
					className,
				)}
				ref={ref}
			>
				<Transition
					show={isActive}
					enter="transition-opacity duration-1000"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="transition-opacity duration-1000"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="text-3xl text-primary px-2 text-accent">{timer}</div>
					<div
						ref={typeViewRef}
						className={clsx(
							'flex items-center flex-wrap gap-x-4 overflow-hidden px-2 mt-2 text-5xl',
						)}
						style={{
							maxHeight: `${viewHeight}px`,
							fontSize: `${options.fontSize}px`,
							lineHeight: `${lineHeight}px`,
						}}
					>
						{filteredWords.map((word, index) => {
							const wordIndex = index + hiddenIndexes.length;
							const isActive = wordIndex === activeIndex;
							const isTypedWord = history[wordIndex];
							const extraChars = isActive
								? typed.slice(word.length)
								: history[wordIndex]?.slice(word.length) || '';
							return (
								<span
									key={word + wordIndex}
									className="word relative h-ful flex items-center"
								>
									{isActive && (
										<span
											ref={caretRef}
											className={clsx(
												'caret absolute top-0 h-full flex w-1 rounded-lg -translate-x-[1px] bg-warning',
												{
													'animate-blink': !isFocus,
													'-left-4': caretDirectionRef.current === 'forward',
													'-right-4': caretDirectionRef.current === 'backward',
												},
											)}
										/>
									)}
									{word.split('').map((char, charIndex) => {
										const isTypedChar =
											isTypedWord || !!(isActive && typed[charIndex]);
										const isSkippedChar =
											isTypedChar &&
											history[wordIndex] &&
											!history[wordIndex][charIndex];
										let isCorrect = false;
										if (isTypedWord) {
											isCorrect = history[wordIndex][charIndex] === char;
										} else if (isTypedChar) {
											isCorrect = typed[charIndex] === char;
										}
										return (
											<span
												key={char + charIndex}
												className={clsx(
													'char transition-all duration-600 ease',
													{
														'text-base-content': !isTypedChar,
														'underline underline-offset-8 text-warning-content':
															isSkippedChar,
														'text-success': isTypedChar && isCorrect,
														'text-error': isTypedChar && !isCorrect,
													},
												)}
											>
												{char}
											</span>
										);
									})}
									<span>
										{extraChars &&
											extraChars.split('').map((char, charIndex) => (
												<span
													key={char + charIndex}
													className="char text-red-500"
												>
													{char}
												</span>
											))}
									</span>
								</span>
							);
						})}
					</div>
				</Transition>
			</div>
		);
	},
);

TypeTester.displayName = 'TypeTester';
export default TypeTester;
