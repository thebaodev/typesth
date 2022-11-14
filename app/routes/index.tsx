import TypeTester from '~/components/TypeTester';
import React from 'react';
import ThemeSwitcher from "~/components/ThemeSwitcher";
import logo from '../assets/images/logo.png';
const Index = () => (
	<main className="flex justify-center items-center h-screen w-screen flex-col">
    <header className="flex w-full p-4 justify-start items-end">
      <a className="flex items-end gap-2">
        <img className="w-6 md:w-8" src={logo} alt="type something endlessly" />
        <h1 className="font-sans text-md lg:text-lg text-base-400">
          typesth endlessly...
        </h1>
      </a>
    </header>
    <div className="container flex-1 flex  justify-center items-center">
      <ThemeSwitcher />
      <TypeTester />
    </div>
    <footer className="w-full p-2 flex justify-start">
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
