import { Test } from '@prisma/client';
import { json, LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import React from 'react';
import { db } from '~/utils/db.server';

type LoaderData = {
	tests: Array<Test>;
};

export const loader: LoaderFunction = async () => {
	const data: LoaderData = {
		tests: await db.test.findMany(),
	};
	return json(data);
};

const Me = () => {
	const data = useLoaderData<LoaderData>();
	return (
		<div>
			{data.tests.map(test => {
				return (
					<div>
						<span>{test.wpm}</span>
						<span>{test.accuracy}</span>
						<span>{test.timeTyped}</span>
						<span>{test.timer}</span>
					</div>
				);
			})}
		</div>
	);
};

export default Me;
