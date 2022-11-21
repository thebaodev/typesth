import React, { forwardRef, useEffect, useRef } from 'react';
import logo from '~/assets/images/logo.png';
import clsx from 'clsx';
import anime from 'animejs';
import Transition from '~/components/transition';
import useStore from '~/store';
import { STATE_RUNNING } from '~/constant';

type HeaderProps = {
	className?: string;
	right?: React.ReactNode;
};

const HEADING_TEXT = 'typesth.endlessly';
const Header = forwardRef<HTMLDivElement, HeaderProps>(
	({ className = '', right = undefined }: HeaderProps, ref) => {
		const { state } = useStore(state => state);
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
				ref={ref}
				className={clsx(
					'flex flex-col md:flex-row items-center justify-between w-full p-4',
					className,
				)}
			>
				<Transition
					show={state !== STATE_RUNNING}
					className="flex items-center self-start md:self-center"
				>
					<a href="/" className="btn btn-ghost rounded-md px-4 mr-2">
						<img className="w-8 md:w-8" src={logo} alt="typesth endlessly" />
					</a>
					<h1
						ref={headingRef}
						className="font-sans ml-auto mr-2 text-sm md:text-md lg:text-sm text-base-400 opacity-80"
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
				{right}
			</header>
		);
	},
);

Header.displayName = 'Header';
export default Header;
