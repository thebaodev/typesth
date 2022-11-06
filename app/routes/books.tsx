import React from 'react';
import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import Card from '~/components/Card';
import { z } from 'zod';
import { books } from '~/data/books';

const book = z.object({
	title: z.string(),
	description: z.string().optional(),
});
type Book = z.infer<typeof book>;

export const loader: LoaderFunction = () => {
	return z.array(book).parse(json({ books }));
};

const Books = () => {
	const { books } = useLoaderData() as { books: Book[] };

	return (
		<div>
			<h1 className=" text-center text-3xl font-bold mb-10 mt-5">
				Welcome to my awesome book library!
			</h1>
			<div className="flex justify-center items-center w-4/5 flex-col mx-auto">
				{books.map(book => (
					<Card key={book.title} {...book} />
				))}
			</div>
		</div>
	);
};

export default Books;
