import React, { forwardRef } from 'react';
import clsx from 'clsx';

type FooterProps = {
	className?: string;
	isShow?: boolean;
};

const Footer = forwardRef<HTMLDivElement, FooterProps>(
	({ className = '', isShow = true }: FooterProps, ref) => {
		return (
			<footer className={clsx('w-full flex justify-end p-4', className)}>
				<div className="text-sm font-sans font-light text-base-content opacity-40">
					made by
					<a
						className="ml-1 hover:underline transition-all"
						href="https://thebao.dev"
						target="_blank"
						rel="noreferrer"
					>
						bao
					</a>
				</div>
			</footer>
		);
	},
);

Footer.displayName = 'Footer';
export default Footer;
