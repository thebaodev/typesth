import React, { useEffect, useRef } from 'react';
import logo from '~/assets/images/logo.png';
import clsx from 'clsx';
import ThemeSwitcher from '~/components/ThemeSwitcher';
import anime from 'animejs';

const HEADING_TEXT = 'type something endlessly...';
const Header = () => {
	const headingRef = useRef<HTMLHeadingElement>(null);
	const animateHeading = () => {
		const heading = headingRef.current;
		const chars = heading?.childNodes;
		anime({
			targets: chars,
			duration: 400,
			loop: true,
			translateY: 2,
			delay: anime.stagger(100),
		});
	};

	useEffect(() => {
		animateHeading();
	}, []);

	return (
		<header className="grid grid-cols-2 justify-between p-4">
			<a href="/">
				<img className="w-6 md:w-8" src={logo} alt="type something endlessly" />
			</a>
			<div className="flex items-center">
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
				<ThemeSwitcher />
			</div>
		</header>
	);
};

export default Header;
