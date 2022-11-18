import TypeTester from '~/components/TypeTester';
import React, { useState } from 'react';
import KBDHint from '~/components/KBDHint';
import Header from '~/components/Header';
import Footer from '~/components/Footer';

const Index = () => {
	const [isActive, setIsActive] = useState(false);

	const handleStarted = () => {
		setIsActive(true);
	};

	const handleStopped = () => {
		setIsActive(false);
	};

	return (
		<main className="grid grid-rows-[auto_1fr_auto_auto] grid-cols-[1fr] h-screen w-screen bg-base-100">
			<Header />
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
			<Footer />
		</main>
	);
};
export default Index;
