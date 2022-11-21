import React, { forwardRef } from 'react';
import clsx from 'clsx';

type KBDHintProps = {
	hints: {
		keys: string[];
		label: string;
	}[];
	className?: string;
};

const KBDHint = forwardRef<HTMLDivElement, KBDHintProps>(
	({ className = '', hints }: KBDHintProps, ref) => {
		return (
			<section
				className={clsx(
					'grid justify-center items-center opacity-40 p-4',
					className,
				)}
			>
				<div className="grid items-center gap-4">
					{hints.map((hint, index) => {
						return (
							<figcaption key={index} className="justify-start">
								{hint.keys.map((key, index) => (
									<>
										<figure key={index} className="inline-flex">
											<kbd className="kbd">{key}</kbd>
										</figure>
										{index !== hint.keys.length - 1 && (
											<span className="mx-1">+</span>
										)}
									</>
								))}
								<label className="text-lg font-light ml-4 text-left">
									{hint.label}
								</label>
							</figcaption>
						);
					})}
				</div>
			</section>
		);
	},
);

KBDHint.displayName = 'KBDHint';
export default KBDHint;
