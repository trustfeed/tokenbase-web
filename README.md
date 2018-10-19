# daobase-web

## Install

### Install dependencies

```sh
npm install
```

## Usage

### Start

The default port of this server is 3000.

```sh
npm run start
```

### Build the app

```sh
npm run dist
```

### Check type

```sh
npm run type-check
```

### Lint

```sh
npm run lint
```

### Prettier

```sh
npm run prettier
```

## Development process

- New issues will, after enough discussion and clarification, be assigned an estimate time to complete, as well as assigned to the next unstarted milestone, by a project coordinator.
- Bugs are always worked before enhancements
- Developers should work each issue according to a numbered branch corresponding to the issue `git checkout -b 123`
- To claim an issue, simply leave a comment with your request to work on it.
- If an issue is already claimed (assigned), do not attempt to claim it. Issues claimed by outside developers will have no assigned dev, but have the developers name in brackets.

**Please keep comments constructive and clean**

## Style guideline

We use [TSLint](https://palantir.github.io/tslint/) with custom configs to keep our code style consistent.

We also use [Prettier](https://prettier.io/) to auto-format our code. Be sure to either add a [text editor integration](https://prettier.io/docs/en/editors.html) or a [pre-commit hook](https://prettier.io/docs/en/precommit.html) to properly format your code changes.

## Branch structure & versioning

We use semantic versioning, but before a package reaches v1.0.0 all breaking changes as well as new features will be minor version bumps.

We have two main branches: master and development.

master represents the most recent released (published on npm) version.

development represents the development state and is a default branch to which you will submit a PR. We use this structure so that we can push hotfixes to the currently released version without needing to publish all the changes made towards the next release. If a hotfix is implemented on master, it is back-ported to development.

## License

[MIT License](http://opensource.org/licenses/MIT).

