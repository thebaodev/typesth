import React from 'react';

const Footer = () => {
	return (
		<footer className="w-full p-4">
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
		</footer>
	);
};

export default Footer;
