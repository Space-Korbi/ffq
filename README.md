# ffq

## Installation
### yarn
brew install yarn

### mongodb
brew tap mongodb/brew
brew install mongodb-community@4.4

### node.js 
cd ffq yarn install
cd ffq/client && yarn install
cd ffq/server && yarn install

## Usage
brew services start mongodb-community@4.4
cd ffq/server && yarn node index.js
cd ffq/client && yarn start
