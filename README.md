# ffq

## Prerequisites

- [Homebrew](https://treehouse.github.io/installation-guides/mac/homebrew)
- [node.js](https://nodejs.org/en/)

## Local installation for development

### yarn

- `brew install yarn`

### mongodb

1. `brew tap mongodb/brew`
2. `brew install mongodb-community@4.4`

### node.js

- `cd ffq && yarn install`
- `ffq/client && yarn install`
- `ffq/server && yarn install`

## Usage

- `brew services start mongodb-community`
- `cd ffq/server && yarn node index.js`
- `cd ffq/client && yarn start`

### ESLint & Prettier in Visula Studio Code

Download these two extensions for autoformatting and linting in VSCode:

- "Prettier Formatter" @5.7.1+
- "ESLint" @ 2.1.13+


[![License: CC BY-NC-ND 4.0](https://img.shields.io/badge/License-CC%20BY--NC--ND%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-nd/4.0/)
