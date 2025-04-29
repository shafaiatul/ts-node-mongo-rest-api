# The Complete Guide To Building A REST API With Node, Express, TypeScript & MongoDB


This is a repository for a REST API tutorial using Node, Express, Typescript & MongoDB.

Features:

- Environment, Typescript, Nodemon setup
- MongoDB & Mongoose connect, Database creation
- Controllers creation
- Middlewares creation
- Cookie based authentication
- Postman testing
- Create, Read, Update

## 📦 List of Packages

### Dependencies (For Production)
- **body-parser**  
  Middleware to parse incoming request bodies.

- **compression**  
  Middleware for gzip/deflate compression.

- **cookie-parser**  
  Middleware to parse cookies.

- **cors**  
  Middleware for enabling Cross-Origin Request Sharing (CORS).

- **express**  
  Web framework for building RESTful APIs.

- **lodash**  
  Utility library for working with arrays, objects, and other data types.

- **mongoose**  
  MongoDB object modeling for Node.js.

---

### DevDependencies (For Development)
- **@types/body-parser**  
  TypeScript definitions for body-parser.

- **@types/compression**  
  TypeScript definitions for compression.

- **@types/cookie-parser**  
  TypeScript definitions for cookie-parser.

- **@types/cors**  
  TypeScript definitions for cors.

- **@types/express**  
  TypeScript definitions for Express.

- **@types/lodash**  
  TypeScript definitions for lodash.

- **@types/mongoose**  
  TypeScript definitions for mongoose.

- **@types/node**  
  TypeScript definitions for Node.js.

- **nodemon**  
  Tool for automatically restarting the server on code changes during development.

- **ts-node**  
  TypeScript execution environment for Node.js.

- **typescript**  
  TypeScript compiler for adding type safety to your code.

---


### Prerequisites

**Node version 14.x**

### 🔧 Installing Packages

You **do not need to install** the packages separately if you already have the `package.json` file, as all required packages are listed in it.

### Simply run:

```bash
npm install

### Setup MongoDB URL

In `src/index.ts`:

```js
const MONGO_URL = ''; // DB URI
```

### Start the app

```shell
npm start
```

## Available commands

Running commands with npm `npm run [command]`

| command         | description                              |
| :-------------- | :--------------------------------------- |
| `start`         | Starts a development instance of the app |


# 🔄 Nodemon Configuration Explained

This project uses [Nodemon](https://www.npmjs.com/package/nodemon) to automatically restart the server whenever changes are made to the codebase. This improves the development workflow by removing the need to manually stop and restart the server.

## 📁 File: `nodemon.json`

This is the configuration file Nodemon reads to know how to behave when you run the app in development mode.

```json
{
  "watch": ["src"],
  "ext": ".ts,.js",
  "exec": "ts-node ./src/index.ts"
}

Key | Description
watch | Tells Nodemon to monitor the src folder. Any file change inside this folder triggers a restart.
ext | File extensions to watch. Here, it looks for .ts (TypeScript) and .js (JavaScript) files.
exec | The command Nodemon uses to run the application. Here, it runs the main file using ts-node.