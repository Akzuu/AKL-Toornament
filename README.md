# AKL-Toornament Integration Module
This Node module integrates Toornament service to AKL infrastructure. It uses TypeScript and MongoDB.

## How to run in local env for development
You must have TypeScript and MongoDB installed and running. Create local.json to config/ and copy config.example to local.json. Fill in the necessary parts. Then run the following commands in your terminal while inside the project.

```Shell
$ npm i
$ tsc
$ nodemon
```

## TODO
- Create necessary endpoints for interacting with Toornament
- Create an interface for the AKL infrastructure to communicate through this module with Toornament