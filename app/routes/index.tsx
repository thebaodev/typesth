import TypeTester from '~/components/TypeTester';
import React, { useEffect, useRef } from 'react';
import ThemeSwitcher from '~/components/ThemeSwitcher';
import logo from '../assets/images/logo.png';
import anime from 'animejs';
import clsx from 'clsx';
const Index = () => {
	const headingRef = useRef<HTMLHeadingElement>(null);
	const animateHeading = () => {
		const heading = headingRef.current;
		const chars = heading?.childNodes;
		anime({
			targets: chars,
			duration: 400,
      loop: true,
			translateY: -4,
			delay: anime.stagger(100),
		});
	};

	useEffect(() => {
		animateHeading();
	}, []);

	const HEADING_TEXT = 'typesth endlessly...';
	return (
		<main className="flex justify-center items-center h-screen w-screen flex-col">
			<header className="fixed top-0 left-0 flex w-full p-4 justify-between items-center">
				<a href="/" className="flex items-end gap-2">
					<img
						className="w-6 md:w-8"
						src={logo}
						alt="type something endlessly"
					/>
				</a>
        <h1
          ref={headingRef}
          className="font-sans text-md lg:text-md text-base-300"
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
			</header>
			<div className="container flex-1 flex flex-col justify-center items-center">

				<TypeTester />
			</div>
			<footer className="w-full p-2 flex justify-center">
				<div className="text-sm font-sans font-light text-base-content">
					made with love by
					<a
						className="ml-1  hover:underline transition-all"
						href="https://thebao.dev"
						target="_blank"
						rel="noreferrer"
					>
						bao
					</a>
				</div>
			</footer>
		</main>
	);
};
export default Index;
