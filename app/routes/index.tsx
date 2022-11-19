import TypeTester from '~/components/TypeTester';
import React, { useEffect, useState } from 'react';
import KBDHint from '~/components/KBDHint';
import Header from '~/components/Header';
import Footer from '~/components/Footer';
import TestResult from '~/components/TestResult';
import Menu from '~/components/Menu';
import { TIMER_15, TIMER_ENDLESS } from '~/constant';

const Index = () => {
	const [isReady, setIsReady] = useState(false);
	const [isTesting, setIsTesting] = useState(false);
	const [isTested, setIsTested] = useState(false);
	const [settings, setSettings] = useState<{ timer: number }>({
		timer: TIMER_15,
	});
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

	const handleFinished = (words: string[], typed: string[], time: number) => {
		setIsTesting(false);
		setIsTested(true);
		setTestData({ words, typed, time });
	};

	const handleRestart = () => {
		setIsTesting(false);
		setIsTested(false);
		setTestData(undefined);
	};

	const handleTimerSettingChange = (timer: number) => {
		setSettings({ ...settings, timer });
	};

	return (
		<main className="grid grid-rows-[auto_6fr_1fr_auto] grid-cols-[1fr] h-screen w-screen items-center justify-center bg-base-100">
			<Header isShowHeading={!isTesting} isShowMenu={!isTesting} />
			<Menu
				isShow={!isTesting}
				className="fixed right-2 top-16"
				callbacks={{
					onTimerChange: handleTimerSettingChange,
				}}
			/>
			{isTested ? (
				<TestResult
					isActive={!!testData}
					data={testData}
					options={{
						timer: settings.timer,
					}}
					className="max-w-screen-xl w-full m-auto mt-12 p-4 md:p-4 lg:p-8"
					callbacks={{
						onRestart: handleRestart,
					}}
				/>
			) : (
				<TypeTester
					isActive={isReady}
					className="max-w-screen-lg w-full m-auto p-6 md:p-6 lg:p-12"
					options={{
						fontSize: 56,
						timer: settings.timer,
						showLines: 3,
						extraLimit: 10,
					}}
					callbacks={{
						onStarted: handleStarted,
						onFinished: handleFinished,
						onRestart: handleRestart,
					}}
				/>
			)}
			<KBDHint
				isShow={isTesting || isTested}
				isShowStop={!isTested && settings.timer === TIMER_ENDLESS}
				className="text-center opacity-40 self-start"
			/>
			<Footer isShow={!isTesting} />
		</main>
	);
};
export default Index;
