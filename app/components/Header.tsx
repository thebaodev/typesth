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

const HEADING_TEXT = 'typesth.endlessly';
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
					'grid grid-cols-[auto_1fr] justify-between p-4 h-auto md:h-12',
					className,
				)}
			>
				<div className="flex items-center">
          <a href="/" className="btn btn-ghost rounded-md px-4 mr-2">
            <img
              className="w-8 md:w-8"
              src={logo}
              alt="typesth endlessly"
            />
          </a>
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
        </div>
				<div className="fixed top-4 right-4">
					<Transition
						show={isShowMenu}
            appear={true}
            enter="transition-transform ease-linear duration-800"
            enterFrom="translate-x-16"
            enterTo="translate-x-0"
            leave="transition-transform ease-linear duration-800"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-16"
					>
						<div className="flex gap-1">
							<ThemeSwitcher />
						</div>
					</Transition>
				</div>
			</header>
		);
	},
);

Header.displayName = 'Header';
export default Header;
