import React, { forwardRef, useEffect, useRef } from 'react';
import logo from '~/assets/images/logo.png';
import clsx from 'clsx';
import ThemeSwitcher from '~/components/ThemeSwitcher';
import anime from 'animejs';
import { Transition } from '@headlessui/react';

type HeaderProps = {
	className?: string;
	isShowHeading?: boolean;
	isShowMenu?: boolean;
};

const HEADING_TEXT = 'type something endlessly...';
const Header = forwardRef<HTMLDivElement, HeaderProps>(
	(
		{ className = '', isShowHeading = true, isShowMenu = true }: HeaderProps,
		ref,
	) => {
		const headingRef = useRef<HTMLHeadingElement>(null);
		const animateHeading = () => {
			const heading = headingRef.current;
			const chars = heading?.childNodes;
			anime({
				targets: chars,
				duration: 400,
				translateY: 2,
				delay: anime.stagger(100),
			});
		};

		useEffect(() => {
			animateHeading();
		}, []);

		return (
			<header
				className={clsx(
					'grid grid-cols-[auto_1fr] justify-between p-4 h-12',
					className,
				)}
			>
				<a href="/" className="btn btn-ghost rounded-md">
					<img
						className="w-6 md:w-8"
						src={logo}
						alt="type something endlessly"
					/>
				</a>
				<div className="flex items-center justify-end">
					<Transition
						show={isShowHeading}
						enter="transition-opacity ease-linear  duration-400"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="transition-opacity ease-linear  duration-400"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<h1
							ref={headingRef}
							className="font-sans ml-auto mr-2 text-md lg:text-sm text-base-400"
						>
							{HEADING_TEXT.split('').map((char, index) => {
								return (
									<span
										className={clsx('inline-flex', { 'ml-1': !char.trim() })}
										key={index}
									>
										{char}
									</span>
								);
							})}
						</h1>
					</Transition>
					<Transition
						show={isShowMenu}
						enter="transition-opacity ease-linear  duration-400"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="transition-opacity ease-linear  duration-400"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<ThemeSwitcher />
					</Transition>
				</div>
			</header>
		);
	},
);

Header.displayName = 'Header';
export default Header;
