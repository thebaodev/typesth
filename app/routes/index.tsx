import TypeTester from '~/components/TypeTester';
import React, { useEffect, useState } from 'react';
import KBDHint from '~/components/KBDHint';
import Header from '~/components/Header';
import Footer from '~/components/Footer';
import TestResult from '~/components/TestResult';

const Index = () => {
	const [isReady, setIsReady] = useState(false);
	const [isTesting, setIsTesting] = useState(false);
	const [isTested, setIsTested] = useState(false);
	const [testData, setTestData] = useState<
		| {
				words: string[];
				typed: string[];
				time: number;
		  }
		| undefined
	>(undefined);

	useEffect(() => {
		setIsReady(true);
	}, []);

	const handleStarted = () => {
		setIsTesting(true);
	};

	const handleStopped = (words: string[], typed: string[], time: number) => {
		setIsTesting(false);
		setIsTested(true);
		setTestData({ words, typed, time });
	};

	const handleRestart = () => {
		setIsTesting(false);
		setIsTested(false);
		setTestData(undefined);
  };

	return (
		<main className="grid grid-rows-[auto_6fr_1fr_auto] grid-cols-[1fr] h-screen w-screen items-center justify-center bg-base-100">
			<Header isShowMenu={!isTesting} />
			{isTested ? (
				<TestResult
					isActive={!!testData}
					data={testData}
					className="max-w-screen-xl w-full m-auto p-2 md:p-4 lg:p-5"
					callbacks={{
						onRestart: handleRestart,
					}}
				/>
			) : (
				<TypeTester
					isActive={isReady}
					className="max-w-screen-lg w-full m-auto p-6 md:p-8 lg:p-12"
					callbacks={{
						onStarted: handleStarted,
						onStopped: handleStopped,
            onRestart: handleRestart,
					}}
				/>
			)}
			<KBDHint
				isActive={isTesting || isTested}
				isShowStop={!isTested}
				className="text-center opacity-40 self-start"
			/>
			<Footer isShow={!isTesting} />
		</main>
	);
};
export default Index;
