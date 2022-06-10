# DragonBallAPI

## Table of contents

- [What it is and Where to find it](#what-it-is)
- [API Usage](#api-usage)
  - [REST](#rest)
  - [Characters](#characters)
  - [Planets](#planets)
- [Acknowledgments](#acknowledgments)

## What it is

**Under Development Jun 2022**

The Dragon Ball API is a RESTful API based on the television series Dragon Ball. API queries will return characters or planets from the series. 
<!-- By creating an account, you will be have the ability to submit characters and planets to the database to help the community grow. -->

## Where to find it
> Check out the deployment [here](https://dragonballapi.herokuapp.com/).

# API Usage
This documentation will help you get familiar with the resources of the Dragon Ball API and show you how to make different queries, so that you can get the most out of it.

<!-- ### Rate Limit -->
<!-- Authentication has been implemented as well as a limit on queries of up to 100 per every 15 minutes. I implemented `express-rate-limit` to stop malicious queries, data submissions, and account creations. After several incorrect attempts, your IP will be flagged for a certain period of time. -->

## REST
Base url: https://dragonballapi.herokuapp.com/api/

The base url contains information about all available API resources.

*Sample Request*
```
https://dragonballapi.herokuapp.com/api/
```
```
//JSON Response

{
  "characters": "https://dragonballapi.herokuapp.com/api/character",
  "planets": "https://dragonballapi.herokuapp.com/api/planet",
}
```
Currently available resources are:

* Character: Used to get all characters
* Planet: Used to get all planets

### Characters

<!-- #### Character schema
|Key|Type|Description|
|---|---|---|
|name|string|The name of the character.
|race|string|The species of the character.
|origin planet|string (url)|Url to the character's origin planet.
|wiki url|string (url)|Link to the character's wiki page.
|series|string|The sub-series that the character is from i.e. Z, GT, etc.
|image|string (url)|Link to the character's image.
|url|string (url)|Link to the character's own URL endpoint.
|created|string|Time at which the character was created in the database. -->
<!-- |edited|string|Time at which the character was last edited in the database. -->

#### Get all characters
You can access the list of characters by using the /character endpoint.
```
https://dragonballapi.herokuapp.com/api/character/
```

#### Get a single character
You can get a single character by adding the name as a parameter: /character/`<Gohan>`

If a name has a space `' '`, replace it with an underscore `_` like in *`Majin_Buu`*
```
https://dragonballapi.herokuapp.com/api/character/Gohan
```
<!-- ```
{
  "species":"Saiyan",
  "status":"Alive",
  "originPlanet":"Earth",
  "gender":"Male",
  "_id":"5c787595373a47d30cff0317",
  "name":"Gohan","series":"Z",
  "image":"../images/Gohan.jpg",
  "created":"2019-02-28T23:58:13.141Z",
  "url":"/api/character/Gohan",
  "__v":0
}
``` -->

### Planets

<!-- #### Planets schema
|Key|Type|Description|
|---|---|---|
|name|string|The name of the planet.
|residents|string|All characters from this planet.
|image|string (url)|Link to the planet's image.
|url|string|Link to planets own endpoint.
|created|string|Time at which the planet was created in the database. -->


#### Get all planets
You can access the list of characters by using the /planet endpoint.
```
https://dragonballapi.herokuapp.com/api/planet/
```

#### Get a single planet
You can get a single character by adding the name as a parameter: /planet/`<Earth>`

If a planet has a space `' '`, replace it with an underscore `_` like in  *`Cooler_6`*
```
https://dragonballapi.herokuapp.com/api/planet/Earth
```
<!-- ```
{
  "residents":["Gohan","Trunks","Android16"],
  "_id":"5c785e7a52cc1dd11ddb59ba",
  "created":"2019-02-28T22:19:38.652Z",
  "name":"Earth",
  "url":"/api/planet/Earth",
  "image":"/api/planet/images/Earth.jpeg",
  "__v":0
}
``` -->

<!-- ## Getting Started -->

<!-- These instructions will get you a copy of the project up and running on your local machine for **development and testing purposes**. -->

<!-- For access to the live deployment, visit:  
[https://dragonballapi.herokuapp.com](https://dragonballapi.herokuapp.com/) -->

<!-- ### Installing

Install all dependencies

```
npm install
```

Create .env file

```
touch .env
```

Add secret key to .env

```
SECRET = ???
``` -->

## Acknowledgments


### Authors
 
[Chad](https://github.com/chadvidovcich) - *Main Author*

<!-- See also the list of [contributors](https://github.com/coswold/Dragon_Ball_API/contributors) who participated in this project. -->

### Built With

* [MongoDB](https://www.mongodb.com/) - Document based database
* [Express](https://expressjs.com/) - Minimalist node.js framework
* [React](https://reactjs.org/) - A JavaScript library for building user interfaces
* [Node (npm)](https://www.npmjs.com/) - Dependency management
* [Bootstrap](https://getbootstrap.com/) - Web Client framework

### Inspiration
* [Rick and Morty API](https://rickandmortyapi.com/) created by [Axel](https://github.com/afuh)
* Shout out to [Coswold](https://github.com/Coswold) for making the [OG DragonBallAPI](https://github.com/Coswold/Dragon_Ball_API)