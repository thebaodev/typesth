import React, { forwardRef } from 'react';
import clsx from 'clsx';
import {Transition} from "@headlessui/react";

type TestResultProps = {
	className?: string;
	data?: {
		words?: string[];
		typed?: string[];
		correct?: number;
		wrong?: number;
		accuracy?: number;
		wpm?: number;
	};
};
const TestResult = forwardRef<HTMLDivElement, TestResultProps>(
	({ className = '' }: TestResultProps, ref) => {
		return (
			<Transition
				appear={true}
				show
				enter="transition-opacity ease-linear duration-600"
				enterFrom="opacity-0"
				enterTo="opacity-100"
				leave="transition-opacity ease-linear duration-600"
				leaveFrom="opacity-100"
				leaveTo="opacity-0"
			>
				<div ref={ref} className={clsx('p-2 text-center', className)}>
					<div className="stats shadow grid-cols-1 grid-rows-3 md:grid-cols-3 md:grid-rows-1">
						<div className="stat border-l md:border-l-0">
							<div className="stat-title mb-4 text-3xl md:text-4xl lg:text-7xl">
								wpm
							</div>
							<div className="stat-value text-2xl md:text-3xl lg:text-5xl mb-4">
								31K
							</div>
							<div className="stat-desc text-md md:text-lg lg:text-xl">
								your speed ↗︎ 40 (2%)
							</div>
						</div>

						<div className="stat">
							<div className="stat-title mb-4 text-3xl md:text-4xl lg:text-7xl">
								accuracy
							</div>
							<div className="stat-value text-2xl md:text-3xl lg:text-5xl mb-4">
								89%
							</div>
							<div className="stat-desc text-md md:text-lg lg:text-xl">
								your acc ↗︎ 40 (2%)
							</div>
						</div>

						<div className="stat">
							<div className="stat-title mb-4 text-3xl md:text-4xl lg:text-7xl">
								you typed
							</div>
							<div className="stat-value text-2xl md:text-3xl lg:text-5xl mb-4">
								45s
							</div>
							<div className="stat-desc text-md md:text-lg lg:text-xl">
								great job!
							</div>
						</div>
					</div>
				</div>
			</Transition>
		);
	},
);

TestResult.displayName = 'TestResult';
export default TestResult;
