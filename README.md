# Snailz - Client Web

## Getting started
- `git clone --recurse-submodules {REPO_URL}` - clone repository with submodules

OR

- `git clone {REPO_URL}` - clone repository
- `git submodule update --init --recursive` - get submodules

## Available scripts
- `yarn dev` - run staging development server
- `yarn dev:prod` - run production development server
- `build:staging` - create an optimized staging build
- `build:prod` - create an optimized productin build
- `start:staging` - run an optimized staging build
- `start:prod` - run an optimized productin build
- `yarn lint` - run eslint checking
- `yarn test` - run jest tests
- `yarn check-code` - run eslint and jest tests