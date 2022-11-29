import type { Test } from '@prisma/client';
import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import React from 'react';
import { db } from '~/utils/db.server';
import { getUser } from '~/utils/session.server';

type LoaderData = {
	user: Awaited<ReturnType<typeof getUser>>;
	tests: Array<Test>;
};

export const loader: LoaderFunction = async ({ request }) => {
	const tests = await db.test.findMany({
		take: 5,
		orderBy: { createdAt: 'desc' },
	});
	const user = await getUser(request);
	const data: LoaderData = {
		tests,
		user,
	};
	return json(data);
};

const Me = () => {
	const data = useLoaderData<LoaderData>();
	return (
		<div>
			{data.user ? (
				<div className="user-info">
					<span>{`Hi ${data.user.username}`}</span>
					<form action="/logout" method="post">
						<button type="submit" className="button">
							Logout
						</button>
					</form>
				</div>
			) : (
				<Link to="/login">Login</Link>
			)}
			{data.tests.map(test => {
				return (
					<div key={test.id}>
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
