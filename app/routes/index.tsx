import TypeTester from '~/components/TypeTester';
import React, { useState } from 'react';
import KBDHint from '~/components/KBDHint';
import Header from '~/components/Header';
import Footer from '~/components/Footer';
import TestResult from '~/components/TestResult';

const Index = () => {
	const [isActive, setIsActive] = useState(false);
	const [isTested, setIsTested] = useState(false);

	const handleStarted = () => {
		setIsActive(true);
	};

	const handleStopped = () => {
		setIsActive(false);
		setIsTested(true);
	};

	return (
		<main className="grid grid-rows-[auto_1fr_auto_auto] grid-cols-[1fr] h-screen w-screen items-center justify-center bg-base-100">
			<Header isShowMenu={!isActive} />
			{!isTested ? (
				<>
					<TypeTester
						className="max-w-screen-lg w-full m-auto p-6 md:p-8 lg:p-12"
						callbacks={{
							onStarted: handleStarted,
							onStopped: handleStopped,
						}}
					/>
					<KBDHint
						className="text-center opacity-40 mb-12 md:mb-24"
						isActive={isActive}
					/>
				</>
			) : (
				<TestResult className="max-w-screen-2xl w-full m-auto p-6 md:p-8 lg:p-12" />
			)}
			<Footer isShowMenu={!isActive} />
		</main>
	);
};
export default Index;
