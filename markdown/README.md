# TODO toy app
- Simple todo list app for ASE 285 final project

## Setup
### npm
- If setting up for first time, check for the existence of, and update to the current version of all packages.
    ```powershell
    > npm install express
    > npm install ejs
    > npm install 'body-parser'
    > npm install -g nodemon
    > npm install 'method-override'
    > npm install mongodb
    ```
## MongoDB
- Create a database with the name 'todoapp' on https://cloud.mongodb.com
  - deploy the database and get the data needed to access it from a server.
- Be sure to change all info needed to access a mongoDB database in index.js before using this.
- register the server's IP with mongoDB
  - if you're running this on your comp, it'll be your IP
