import TypeTester from '~/components/TypeTester';

const Index = () => (
	<main className="flex justify-center items-center h-screen w-screen flex-col">
		<div className="container flex-1 flex  justify-center items-center">
			<TypeTester />
		</div>
		<footer className="w-full p-2 flex justify-center lg:justify-end ">
			<div className="text-left font-sans font-light text-stone-400">
				made with love by
				<a
					className="ml-1 hover:text-stone-700 transition-all"
					href="https://thebao.dev"
					target="_blank"
					rel="noreferrer"
				>
					bao
				</a>
			</div>
		</footer>
	</main>
);

export default Index;
