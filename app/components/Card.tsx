import type { FC, ReactElement } from 'react';

const Card: FC<{ title: string; description?: string }> = ({
	title,
	description,
}): ReactElement => (
	<div
		data-testid="book-card-container"
		className=" w-full text-center flex flex-col justify-center items-center my-10 p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
	>
		<h2
			data-testid="book-card-title"
			className="font-bold text-xl mb-5 text-white"
		>
			{title}
		</h2>
		<p>{description}</p>
	</div>
);

export default Card;
