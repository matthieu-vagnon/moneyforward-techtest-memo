- [Money Forward Technical Test - Memo](#money-forward-technical-test---memo)
  - [Type of Project](#type-of-project)
  - [Features](#features)
  - [Dependencies](#dependencies)
  - [Installation](#installation)
    - [Prerequisites](#prerequisites)
    - [Set Up Local Repository](#set-up-local-repository)
    - [Run the App](#run-the-app)
  - [Available Scripts](#available-scripts)
  - [Author](#author)

# Money Forward Technical Test - Memo

![Version](https://img.shields.io/badge/version-0.0.0-blue)
![React](https://img.shields.io/badge/React-19.1.0-blue)

_A simple memo web application made with React for Money Forward's technical test (senior front-end engineer role)._

## Type of Project

- [ ] Freelance project
- [x] Hobby project
- [ ] Other project

## Features

- **Memo** - Ability to create, delete, edit memos in an auto generated session
- **Accessibility** - Accessible application for mobile, tablet and desktop
- **Performance** - Optimized API fetching with React Query (using full potential of cache and refresh management)

## Dependencies

- [Material UI](https://mui.com/material-ui/) for UI components as well as theming (with Emotion)
- [TanStack Query](https://tanstack.com/query/) for optimized API fetching
- [ESLint](https://eslint.org) for code linting

## Installation

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Set Up Local Repository

1. Clone the repository

   ```bash
   git clone https://github.com/matthieu-vagnon/moneyforward-techtest-memo.git
   cd moneyforward-techtest-memo
   ```

2. Install dependencies

   ```bash
   npm install
   # or
   yarn install
   ```

3. Configure environment variables

   Edit the `.env` file to configure your environment variables.

### Run the App

Run the development server:

```bash
npm start
# or
yarn start
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Available Scripts

- `npm run start` - Starts the application's local server
- `npm run build` - Builds the application for production
- `npm run lint` - Runs ESLint to check code quality

## Author

- [Matthieu Vagnon](https://mvagnon.dev)
