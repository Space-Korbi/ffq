# ffq

## Local installation for development

### yarn

- brew install yarn

### mongodb

- brew tap mongodb/brew
- brew install mongodb-community@4.4

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
