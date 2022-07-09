# DragonBallAPI

## Table of contents 

- [What it is and Where to find it](#what-it-is)
- [API Usage](#api-usage)
  - [REST](#rest)
  - [Characters](#characters)
- [Acknowledgments](#acknowledgments)

## What it is

The Dragon Ball API is a RESTful API based on the television series Dragon Ball. API queries will return characters from the series. 

This project serves as a playground for learning. The server side is written in **Express** and utilizes **MongoDB** as the database. Once I had the RESTful API set up, I created a quick client site using React and Bootstrap.

I also set up **ESlint** for linting and **Mocha/Chai** for testing. These were added to the CI/CD pipeline and now run at each push to the master branch on Github. 

## Where to find it

> Check out the web UI deployment (React) [here](https://dragonballapi.herokuapp.com/).

## RESTful API Usage
This documentation will help you get familiar with the resources of the Dragon Ball API and show you how to make different queries, so that you can get the most out of it.

### Character Schema
```
name: {
  type: String,
  require: true,
  unique: true,
}


planet: {
  type: String,
  require: true,
  unique: false,
}
```

### Base URL
API Base URL: https://dbapidb.herokuapp.com/api/

The base URL contains information about all available API resources.

*Sample Request*
```
https://dbapidb.herokuapp.com/api/
```
```
//JSON Response

{
  {'GET all characters': `{Base_URL}/character`},
  {'GET character by ID': `{Base_URL}/character/ID/:id`},
  {'GET character by name': `{Base_URL}/character/:name`},
  {'POST add character by ID': `{Base_URL}/character/add`},
  {'PUT update character by ID': `{Base_URL}/character/update/:id`},
  {'DELETE character by ID': `{Base_URL}/character/delete/:id`}
}
```

**Get all characters**

You can access the list of all characters by using the /character endpoint.

```
GET
https://dbapidb.herokuapp.com/api/character/
```

```
//JSON Response

{
  {"_id":"62c5cf5d6e63660cb8b7c5e3","name":"Goku","planet":"Earth","__v":0},
  {"_id":"62c5cf636e63660cb8b7c5e7","name":"Vegeta","planet":"Earth","__v":0},
  {"_id":"62c5e7a28ec5037eac93a1e2","name":"Gohan","planet":"Earth","__v":0},
  {"_id":"62c684d4097c6a7af38a3600","name":"Bulma","planet":"Earth","__v":0}]

}
```

**Get a single character by name:**

If a name has a space `' '`, replace it with an underscore `_` like in *`Majin_Buu`*

```
GET
https://dbapidb.herokuapp.com/api/character/Goku
```

```
//JSON Response

{
  {"_id":"62c5cf5d6e63660cb8b7c5e3","name":"Goku","planet":"Earth","__v":0}

}
```


**Get a single character by ID:**

```
GET
https://dbapidb.herokuapp.com/api/character/ID/62c5cf636e63660cb8b7c5e7
```

```
//JSON Response

{
  {"_id":"62c5cf636e63660cb8b7c5e7","name":"Vegeta","planet":"Earth","__v":0}

}
```

**Add a new character:**

New character must follow the [character schema](#character-schema)

```
POST
https://dbapidb.herokuapp.com/api/character/add
```

```
//JSON Response

{
  {"name":"NewCharacter","planet":"NewPlanet","_id":"62c92046e8b41273c809c8db","__v":0}

}
```

**Update character by ID:**

Character update must follow the [character schema](#character-schema)

```
PUT
https://dbapidb.herokuapp.com/api/character/update/62c5cf636e63660cb8b7c5e7
```

```
//JSON Response

{
  {"acknowledged":true,"modifiedCount":1,"upsertedId":null,"upsertedCount":0,"matchedCount":1}

}
```
**Delete character by ID:**

```
DELETE
https://dbapidb.herokuapp.com/api/character/delete/62c5cf636e63660cb8b7c5e7
```

```
//JSON Response

{
  "deleted successfully"

}
```

## Local Installation

You can follow these steps to run the application on your local environment for **development and testing purposes**.

For access to the live web UI deployment, visit:  
[https://dragonballapi.herokuapp.com](https://dragonballapi.herokuapp.com/)

### Installing

Install all dependencies. This will trigger npm install in both the server and client folders. 

```
npm install
```

Create .env file in the server folder for access to MongoDB URI

```
touch ./server/.env
```

Add the following to the new file at /server/.env

[Follow this guide to find your Mongo URI](https://www.mongodb.com/docs/guides/atlas/connection-string/)

```
ATLAS_URI = "mongodb+srv://<YOUR MONGODB URI>"

NODE_ENV="develop"
```

Start the server and client concurrently for local **development and testing purposes**

```
npm start
```

## Acknowledgments

### Authors
 
[Chad](https://github.com/chadvidovcich) - *Main Author*

### Built With MERN

* [MongoDB](https://www.mongodb.com/) - Document based database
* [Express](https://expressjs.com/) - Minimalist node.js framework
* [React](https://reactjs.org/) - A JavaScript library for building user interfaces
  * [Bootstrap](https://getbootstrap.com/) - Frontend toolkit
* [Node (npm)](https://www.npmjs.com/) - Dependency management
  * [ESlint](https://eslint.org/) - Linting and CI/CD
  * [Mocha](https://mochajs.org/) - Testing framework
  * [Chai](https://www.chaijs.com/) - Testing assertion library