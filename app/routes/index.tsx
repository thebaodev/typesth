import TypeTester from '~/components/TypeTester';

const Index = () => (
	<main className="flex justify-center items-center h-screen w-screen flex-col text-center">
		<header>
			<h1>typesth</h1>
		</header>
		<div className="container flex-1 flex  justify-center items-center">
			<TypeTester />
		</div>
		<footer>made with love by bao</footer>
	</main>
);

export default Index;
