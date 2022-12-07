# TRZ (The Resident Zombie) - Backend

## Summary

- [ How to setup ](#how-to-setup)
- [ Enviroment Variables ](#environment-variables)
- [ Avaliabe Routes ](#avaliable-routes)
- [ Scripts ](#scripts)
- [ Code Linters ](#code-linters)

## How to Setup

First of all, setup the enviroment variables, make a copy of the content of the
`.env.example` file into a `.env` file to run with the default api configs, if you
want to setup your own database or change some variable, check the [enviroment variables](#environment-variables) section, to quick setup the database with docker, run the
following command

```
docker-compose up -d db
```

Now, install the project dependencies with yarn

```
yarn
```

Now you have 2 options to start the project:

1. Start the apllication in development mode
2. build and start the project

Option 1:

run

```
yarn dev
```

Option2:

run

```
yarn build
```

and then

```
yarn start
```

Now you can open your browser on http://localhost:3333 and the aplicattion will be running.

## Avaliable Routes

- `GET - /survivors`:
  This endpoint must return a list all the survivors.

- `GET - /survivor/:id`:
  This endpoint must return the informations about a survivor

- `POST - /survivor`:
  This endpoint must create a survivor
  request body must be a json with the following format:
  ```json
  "survivor": {
  	"name": "string",
  	"age": "positive integer",
  	"gender": "male | female | others",
  	"last_location": {
  		"latitude": "number",
  		"longitude": "number"
  	}
  },
  "inventory": {
  	"fiji_water": "positive integer",
  	"campbell_soup": "positive integer",
  	"first_aid_pouch": "positive integer",
  	"ak47": "positive integer"
  }
  ```
- `PUT - /survivor/update-location/:id`:
  This endpoint must update the location of a survivor
  request body must be a json with the following format:

  ```json
  {
    "latitude": "number",
    "longitude": "number"
  }
  ```

- `POST - /report/:survivorReportOwnerId`:
  This endpoint must create report to a survivor
  request body must be a json with the following format:
  ```json
  {
    "target_survivor": "id of the survivor to report"
  }
  ```

## Environment Variables

**Environment**

- `NODE_ENV`: Setup your environment

**Application Options**

- `URL`: Set the URL of the application
- `PORT`: Set the port of the application

**Database**

- `DB_HOST`: Can be used to define where your database is running
- `DB_PORT`: Set the port of the database
- `DB_USERNAME`: Set your database user
- `DB_PASSWORD`: The password of your database
- `DB_NAME`: Defines the name of your database

## Scripts

There is four types of scritpts on the project

- `dev`: Run the aplicattion on development mode, so you can edit files on the aplicattion and the server will re-start automatically. **note**: This script isn't recommend for **production**
- `test`: Run all tests of the aplicattion
- `build`: Generate a production build of the aplicattion
- `start`: start the builded aplication

## Code Linters

This project use two different code linters and a another
extension to the IDE, that is...

### Eslint

Or EcmaScriptLint, is the linter responsible to check problems in the syntax and return errors, your configurations are shared and used by others linters

### Prettier

This linter is used only for check the **code style**, they don't will check the syntax, just find a way to do the code more **legible** and have a integration with **eslint**

### Editor Config

That isn't a linter, just a extension to share some configs between other editors, like the format of the end of lines, identation with spaces or tabs, etc...
