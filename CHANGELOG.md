# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.2.3] - 2022-02-23
### Added
- TypeScript definitions file (.d.ts) in dist directory.
- Reference to TypeScript definitions file in package.json.

### Changed
- Moved unit test file from src to test directory.

### Removed
- Unit test file from dist directory.

## [1.2.2] - 2022-02-23
### Fixed
- Missing dist directory reference for `main` in package.json.

## [1.2.1] - 2022-02-23
### Fixed
- Incorrect dist directory reference for `files` in package.json.

## [1.2.0] - 2022-02-23
### Added
- Dev dependency: "@types/jest": "^27.4.1".
- Dev dependency: "@types/node": "^17.0.20".
- Dev dependency: "prettier": "^2.5.1".
- Dev dependency: "ts-jest": "^27.1.3".
- Dev dependency: "tslint": "^6.1.3".
- Dev dependency: "tslint-config-prettier": "^1.18.0".
- Dev dependency: "typescript": "^4.5.5".
- Scripts in package.json: `build`, `format`, and `lint`.
- URLs in package.json for `homepage` and `bugs`.
- Jest configuration in package.json file, for TypeScript support.
- Configuration files for TypeScript, Prettier, and TS-Lint.
- Rules in .gitignore file.
- Changelog file.

### Changed
- Converted JavaScript source files to TypeScript.
- Fixed lint error: no-shadowed-variable.
- Fixed lint error: prefer-for-of.

## [1.1.0] - 2022-02-23
### Added
- Optional maximum value parameter for `distribute` function.
- Unit tests for maximum value parameter in `distribute` function.
- Documentation for maximum value parameter in `distribute` function.

## [1.0.1] - 2022-01-24
### Added
- Keywords for NPM in package.json.

## [1.0.0] - 2022-01-22
### Added
- Dev dependency: "jest": "^27.4.7".
- Random functions: `color`, `distribute`, `pick`, `integer`, and `sample`.
- Unit tests for library functions.
- Documentation for library functions in README file.
- MIT +no-false-attribs License.
