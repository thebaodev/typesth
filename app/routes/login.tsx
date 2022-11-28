import type { ActionFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useActionData, useSearchParams } from '@remix-run/react';
import React from 'react';
import { db } from '~/utils/db.server';
import { createUserSession, login, register } from '~/utils/session.server';

function validateUsername(username: unknown) {
	if (typeof username !== 'string' || username.length < 3) {
		return `Usernames must be at least 3 characters long`;
	}
}

function validatePassword(password: unknown) {
	if (typeof password !== 'string' || password.length < 6) {
		return `Passwords must be at least 6 characters long`;
	}
}

function validateUrl(url: any) {
	console.log(url);
	let urls = ['/me', '/', 'https://typesth.com'];
	if (urls.includes(url)) {
		return url;
	}
	return '/me';
}

type ActionData = {
	formError?: string;
	fieldErrors?: {
		username: string | undefined;
		password: string | undefined;
	};
	fields?: {
		loginType: string;
		username: string;
		password: string;
	};
};

const badRequest = (data: ActionData) => json(data, { status: 400 });

export const action: ActionFunction = async ({ request }) => {
	const form = await request.formData();
	const loginType = form.get('loginType');
	const username = form.get('username');
	const password = form.get('password');
	const redirectTo = validateUrl(form.get('redirectTo') || '/');
	if (
		typeof loginType !== 'string' ||
		typeof username !== 'string' ||
		typeof password !== 'string' ||
		typeof redirectTo !== 'string'
	) {
		return badRequest({
			formError: `Form not submitted correctly.`,
		});
	}

	const fields = { loginType, username, password };
	const fieldErrors = {
		username: validateUsername(username),
		password: validatePassword(password),
	};
	if (Object.values(fieldErrors).some(Boolean))
		return badRequest({ fieldErrors, fields });

	switch (loginType) {
		case 'login': {
			const user = await login({ username, password });
			if (!user) {
				return badRequest({
					fields,
					formError: `Username/Password combination is incorrect`,
				});
			}
			return createUserSession(user.id, redirectTo);
		}
		case 'register': {
			const userExists = await db.user.findFirst({
				where: { username },
			});
			if (userExists) {
				return badRequest({
					fields,
					formError: `User with username ${username} already exists`,
				});
			}
			const user = await register({ username, password });
			if (!user) {
				return badRequest({
					fields,
					formError: `Something went wrong trying to create a new user.`,
				});
			}
			return createUserSession(user.id, redirectTo);
		}
		default: {
			return badRequest({
				fields,
				formError: `Login type invalid`,
			});
		}
	}
};

const Login = () => {
	const actionData = useActionData<ActionData>();
	const [searchParams] = useSearchParams();
	return (
		<div className="h-screen w-screen">
			<div className="flex h-full items-center justify-center" data-light="">
				<form method="post">
					<input
						type="hidden"
						name="redirectTo"
						value={searchParams.get('redirectTo') ?? undefined}
					/>
					<fieldset>
						<legend className="sr-only">Login or Register?</legend>
						<label>
							<input
								type="radio"
								name="loginType"
								value="login"
								className="radio"
								defaultChecked={
									!actionData?.fields?.loginType ||
									actionData?.fields?.loginType === 'login'
								}
							/>{' '}
							Login
						</label>
						<label>
							<input
								type="radio"
								name="loginType"
								value="register"
								className="radio"
								defaultChecked={actionData?.fields?.loginType === 'register'}
							/>{' '}
							Register
						</label>
					</fieldset>
					<div>
						<label className="label" htmlFor="username-input">
							<span className="label-text">Username</span>
						</label>
						<input
							type="text"
							id="username-input"
							name="username"
							className="input input-bordered"
							defaultValue={actionData?.fields?.username}
							aria-invalid={Boolean(actionData?.fieldErrors?.username)}
							aria-errormessage={
								actionData?.fieldErrors?.username ? 'username-error' : undefined
							}
						/>
						{actionData?.fieldErrors?.username ? (
							<p
								className="form-validation-error"
								role="alert"
								id="username-error"
							>
								{actionData.fieldErrors.username}
							</p>
						) : null}
					</div>
					<div>
						<label className="label" htmlFor="password-input">
							<span className="label-text">Password</span>
						</label>
						<input
							id="password-input"
							name="password"
							className="input input-bordered"
							defaultValue={actionData?.fields?.password}
							type="password"
							aria-invalid={
								Boolean(actionData?.fieldErrors?.password) || undefined
							}
							aria-errormessage={
								actionData?.fieldErrors?.password ? 'password-error' : undefined
							}
						/>
						{actionData?.fieldErrors?.password ? (
							<p
								className="form-validation-error"
								role="alert"
								id="password-error"
							>
								{actionData.fieldErrors.password}
							</p>
						) : null}
					</div>
					<div id="form-error-message">
						{actionData?.formError ? (
							<p className="form-validation-error" role="alert">
								{actionData.formError}
							</p>
						) : null}
					</div>
					<button type="submit" className="btn btn-primary mt-4">
						login
					</button>
				</form>
			</div>
		</div>
	);
};

export default Login;
