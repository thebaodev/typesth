import { Transition } from '@headlessui/react';
import React, { forwardRef } from 'react';
import clsx from 'clsx';

type FooterProps = {
	className?: string;
	isShow?: boolean;
};

const Footer = forwardRef<HTMLDivElement, FooterProps>(
	({ className = '', isShow = true }: FooterProps, ref) => {
		return (
			<footer className={clsx('w-full p-4 opacity-40 h-12 ', className)}>
				<Transition
					show={isShow}
          className="px-4"
					enter="transition-opacity ease-linear  duration-400"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="transition-opacity ease-linear  duration-400"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="text-sm font-sans font-light text-base-content">
						made with love by
						<a
							className="ml-1 hover:underline transition-all"
							href="https://thebao.dev"
							target="_blank"
							rel="noreferrer"
						>
							bao
						</a>
					</div>
				</Transition>
			</footer>
		);
	},
);

Footer.displayName = 'Footer';
export default Footer;
