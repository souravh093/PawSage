# Project Overview

# Project Name: PAWSAGE.

# Live URL:

```bash
https://paysage-server.vercel.app/
```

# Project description

PAWSAGE is a pet tips and stories sharing website. There we can create pet tips and stories post and manipulate that as well. This website and premium features like create premium post and normal user don't access this posts. There are two user ADMIN and USER. This two role have different access this website. This website have authentication and authorization system. This website like social media like there can like, comment, share post ass well. Follow other user as well.

# Technologies Used

- Typescript (Programming language)
- Express.js (Node.js framework)
- Mongoose (MongoDB ORM)
- Zod (Validation Library)
- Bcrypt.js (Secure Password)
- jsonwebtoken (authentication and authorization)
- Eslint (Error showing)
- Prettier (Format code)

# Features

* SignUp and Login Admin
* SignUp and Login User
* Create Post Admin and User
* Authentication
* Authorization
* Payment system
* Secure Password


# Backend server setup and how to running

# step-1: initialize npm and setup basic express server

Initialize node package manager(NPM) with default input

```javascript
npm init -y
```

Install the express, cors, jsonwebtoken, and dotenv package

```javascript
npm install express cors dotenv jsonwebtoken
```

Install bcrypt.js for secure password

```
npm install bcrypt.js
```

Make folder structure using modular pattern

```javascript
src
    app
      middleware
      errors
      routes
      utils
      interfaces
      config
        index.ts
      modules
        users
            ...files
        bike
            ...fils
        booking
            ...files
    app.ts
    server.ts
```

Install types of node, express, and cors

```javascript
npm i --save-dev @types/cors @types/node @types/express
```

# step-2: initialize typescript with related package

Install typescript developer dependency

```javascript
npm install -D typescript
```

Initialize typescript and configuration it the tsconfig.json

```javascript
tsc --init
```

In the tsconfig change the root directory and out directory destination. (Note: uncomment the rootDir and outDir)

```javascript
"rootDir": "./src",
"outDir": "./dist",
```

Run typescript code install ts-node-dev as developer dependency

```javascript
npm install -D ts-node-dev
```

# step-3: install mongoose and connect with project and .env code add

Install mongoose

```javascript
npm install mongoose
```

Connect with mongoose this following code

```javascript
import mongoose from 'mongoose';
import config from './app/config';
import app from './app';

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    app.listen(config.port, () => {
      console.log(`Server listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
```

# step-4: install eslint and prettier for typescript

Install all package related eslint and prettier for typescript as developer dependency

```javascript
npm install --save-dev @typescript-eslint eslint-plugin @typescript-eslint/parser eslint eslint-config-prettier eslint-plugin-import eslint-plugin-prettier prettier
```

File: tsconfig.json add below this two line inside first object

```javascript
"include": ["./src/**/*.tsx", "./src/**/*.ts"],
"exclude": ["node_modules", "test/**/*.ts"]
```

Past this initialize configuration .eslintrc anytime we can change the configuration what we want

```javascript
{
  "parser": "@typescript-eslint/parser",
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  "plugins": ["prettier"],
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "rules": {
    "no-unused-expressions": "error",
    "prefer-const": "error",
    "no-console": "warn",
    "@typescript-eslint/no-unused-vars": "error"
  },
  "globals": {
    "process": "readonly"
  }
}
```

Ignore linting this folder

```javascript
node_modules;
dist;
```

File: .prettierrc.json and this initialize configuration and we can change the

```javascript
{
    "semi": true,
    "singleQuote": true
}
```

File: .prettierignore add this folder

```javascript
node_modules;
dist;
```

# step-5: Configuration the package.json with script

Main destination change that

```javascript
"main": "./dist/server.js",
```

Make the script for running project locally, build project, lint all file, fix problem using lint, and format code using prettier.

```javascript
  "scripts": {
    "build": "tsc",
    "start:prod": "node ./dist/server.js",
    "start:dev": "ts-node-dev --respawn --transpile-only ./src/server.ts",
    "lint": "eslint src/**/*.ts",
    "fix": "eslint src/**/*.ts --fix",
    "format": "prettier --ignore-path .gitignore --write \"./src/**/*.+(js|ts|json)\"",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

# step-6: Install ZOD OR JOI validation package

Install ZOD package

```javascript
npm install zod
```

Install JOI package

```javascript
npm install joi
```

# step-7: Run project locally

step-7.1
Run eslint

```javascript
npm run lint
```

step-7.2
Run prettier

```javascript
npm run format
```

step-7.3
Build project

```javascript
npm run build
```

step-7.4
Run javascript file

```javascript
npm run start:prod
```

step-7.5
Run locally typescript file

```javascript
npm run start:dev
```

Author: Sourave Halder

# Thank You for Scrolling my Readme file
