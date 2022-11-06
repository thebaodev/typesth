# typesth
**type something fun ☺ everyday**
---
<a href="https://github.com/thebaodev/typesth/discussions">
<img alt="Join the community on GitHub Discussions" src="https://img.shields.io/badge/Join%20the%20community-on%20GitHub%20Discussions-blue">
</a>
<a href="https://github.com/semantic-release/semantic-release">
<img alt="npm next version" src="https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release">
</a>
<a href="https://www.npmjs.com/package/semantic-release">
<img alt="npm latest version" src="https://img.shields.io/npm/v/semantic-release/latest.svg">
</a>
<a href="https://www.npmjs.com/package/semantic-release">
<img alt="npm next version" src="https://img.shields.io/npm/v/semantic-release/next.svg">
</a>
---

## What's in the stack

- SSR with [Remix](https://remix.run/)
- UI with [React](https://github.com/facebook/react)
- Styling with [Tailwind](https://tailwindcss.com/)
- Unit testing with [Vitest](https://vitest.dev) and [Testing Library](https://testing-library.com)
- Code formatting with [Prettier](https://prettier.io)
- Linting with [ESLint](https://eslint.org)
- Static Types with [TypeScript](https://typescriptlang.org)
- Pre-commit hooks using [Husky](https://typicode.github.io/husky/#/)

## Development

Make sure the dependencies are installed

```sh
npm install
```

Afterwards, start the Remix development server like so:

```sh
npm run dev
```

Open up [http://localhost:3000](http://localhost:3000) and you should be ready to go!

### Precommit hooks

We use **Husky** to run a pre-commit hook to lint the code.

This prevents us from having to run the linters into our pipelines. It will not let you commit if you have linting errors.

The pre-commit hook will run the following commands:

```sh
npm run hook
```

You can move this step into a github action, or run it manually. But this method is faster for development as you won't have to wait for the hook to run in the pipeline.

## GitHub Actions

We use GitHub Actions for continuous integration and deployment. Anything that gets into the `main` branch will be deployed to production after running tests/build/etc. Anything in the `dev` branch will be deployed to staging.

## Testing

### Vitest

For tests of utilities and individual components, we use `vitest`. We have DOM-specific assertion helpers via [`@testing-library/jest-dom`](https://testing-library.com/jest-dom).

You can run the tests with `yarn test` or `yarn vitest:coverage` to also show the coverage.

### Type Checking

This project uses TypeScript. It's recommended to get TypeScript set up for your editor to get a really great in-editor experience with type checking and auto-complete. To run type checking across the whole project, run `yarn lint`.

### Linting

This project uses ESLint for linting. That is configured in `.eslintrc.js`.

### Formatting

We use [Prettier](https://prettier.io/) for auto-formatting in this project. It's recommended to install an editor plugin (like the [VSCode Prettier plugin](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)) to get auto-formatting on save. There's also a `yarn format` script you can run to format all files in the project.

## Ggetting help

if you have questions, concerns, bug reports, etc, please file an issue in this repository's Issue Tracker.

## Getting involved

this section should detail why people should get involved and describe key areas you are
currently focusing on; e.g., trying to get feedback on features, fixing certain bugs, building
important pieces, etc.

general instructions on _how_ to contribute should be stated with a link to [CONTRIBUTING](CONTRIBUTING.md).
