- [Matthieu Vagnon Web - Personal Website](#matthieu-vagnon-web---personal-website)
  - [💻 Gallery](#-gallery)
  - [🚀 Features](#-features)
  - [🛠️ Installation](#️-installation)
    - [Prerequisites](#prerequisites)
    - [Set Up Local Repository](#set-up-local-repository)
    - [Run the App](#run-the-app)
  - [🔧 Available Scripts](#-available-scripts)
  - [📦 Project Structure](#-project-structure)
  - [🎨 Styling](#-styling)
  - [👨‍💻 Author](#-author)

# Matthieu Vagnon Web - Personal Website

![Version](https://img.shields.io/badge/version-0.0.0-blue)
![React](https://img.shields.io/badge/React-19.1.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

A simple memo web application made with React for Money Forward's technical test (senior front-end engineer role).

## 💻 Gallery

Further explaination of the project as well as images from the software are available [here](https://www.mvagnon.dev/case-studies/money-forward-challenge).

## 🚀 Features

- **Memo** - Ability to create, delete, edit memos in an auto generated session
- **Accessibility** - Accessible application for mobile, tablet and desktop
- **Performance** - Optimized API fetching with React Query (using full potential of cache and refresh management)

## 🛠️ Installation

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Set Up Local Repository

1. Clone the repository

   ```bash
   git clone https://github.com/matthieu-vagnon/matthieu-vagnon-web.git
   cd matthieu-vagnon-web
   ```

2. Install dependencies

   ```bash
   npm install
   # or
   yarn install
   ```

3. Configure environment variables
   ```bash
   cp .env.example .env.local
   ```
   Edit the `.env` file to configure your environment variables.

### Run the App

Run the development server:

```bash
npm start
# or
yarn start
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## 🔧 Available Scripts

- `npm run start` - Starts the application's local server
- `npm run build` - Builds the application for production
- `npm run lint` - Runs ESLint to check code quality

## 📦 Project Structure

This is a [React.js](https://react.dev) project bootstrapped with [`create-react-app`](https://create-react-app.dev).

## 🎨 Styling

- [Material UI](https://mui.com/material-ui/) for UI components as well as theming (with Emotion)

## 👨‍💻 Author

- [Matthieu Vagnon](https://mvagnon.dev)
