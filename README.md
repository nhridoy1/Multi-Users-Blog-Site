# Welcome to the MERN Blog-Site project

### _A complete (Work in progress now) MERN repository following all production best practices._

In this repository I will keep adding the production best practices we should follow in a MERN (MongoDB, Express.js, React.js, and Node.js) project. Also I am using React for the UI.

## Technology stack

As the name suggests, this repository is built on top of Express.js and React.js, however in the implementation detail, we will find other supporting technologies as well.

#### Client side

- React - A JavaScript library for building user interfaces

#### Server side

- Node.js - evented I/O for the backend
- Express.js - Fast, unopinionated, minimalist web framework for Node.js
- MongoDB - The application data platform for NoSQL databases
- Mongoose - mongoose
- Swagger - Swagger (Not done yet)
- Jest - JavaScript testing framework

Details frameworks and packages can be found in the package.json files in server and client directory.

## Running the application

This project can be run basically in one way. One is to run manually via vscode.


### Visual Studio Code

#### Prerequisites

- Node.js : To run npm packages
- MongoDB : As a database for the application

##### Steps

- To run via vscode, we should run the server and client side projects separately, and also make sure mongodb is up and running.
- Create a `.env` file inside of the `server` directory. Add the below entries or change accordingly. You can follow the `.env.sample` file to see the format.

  ```
  DB_HOST=localhost
  DB_PORT=27017
  DB_NAME=appdb
  JWT_SECRET=secret
  JWT_EXPIRES_IN=3600
  PORT=5000
  IS_MONGODB_CLOUD_URL=false
  MONGODB_CLOUD_URL=mongodb+srv:// <USER >: <PASSWORD >@cluster0.abcd.mongodb.net/myFirstDatabase?retryWrites=true
  ```

#### Server commands
We assume we run the MongoDB in the docker container.
```sh
cd server
npm i
npm start
```

#### Client commands

```sh
cd client
npm start
```

## Contribution 
For now, I am not taking any community contritutions in terms of code.  But if you have any suggestions or you found any bugs, please feel free to open an issue or a pull request.

On the other hand, if you want to know something, or want to start a discussion about this  project, please start a discussion in our GitHub's discussion board.

Thanks. Cheers.