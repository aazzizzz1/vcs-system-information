# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


# VCS Server

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Create .env file that contains your database setting such as hostname, username, password, database name, and secret key for authentication purpose.

.env.development

```
VITE_API_SERVER = http://localhost:8000/api/
VITE_SOCKET_SERVER = http://localhost:3001
VITE_SECRET_KEY = vocs-server-secret-key
```

.env.production

```
VITE_API_SERVER = http://172.16.6.117:8000/api/
VITE_SOCKET_SERVER = http://172.16.6.117:3001
VITE_SECRET_KEY = vocs-server-secret-key
```

### Installing

Clone this repository and run the following command

```
npm install
```

After all packages installed, place the .env files on this app folder. The directory should be like this

```
├── .env
├── package-lock.json
├── package.json
└── src
    ├── assets
    ├── components
    ├── config
    ├── pages
    ├── utils
    ├── App.jsx
    ├── main.jsx
    └── index.scss
```

## Running the application

```
npm run dev
```

## Running test

```
npm run test
```

## Built with

- [React](https://react.dev/) - The library for web and native user interfaces
- [Tailwind](https://tailwindcss.com/) - CSS framework
- [Redux](https://redux.js.org/) - State management library
- [Vite](https://vitejs.dev/) - Module bundler
- [JWT](https://jwt.io/) - JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object.
- [Socket.IO](https://socket.io//) - Socket.IO is a library that enables low-latency, bidirectional and event-based communication between a client and a server.
- [Formik](https://formik.org/) - Library for creating Form elements
- [Yup](https://github.com/jquense/yup) - a schema builder for runtime value parsing and validation
