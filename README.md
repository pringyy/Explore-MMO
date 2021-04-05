# Explore MMO: A Massively Multiplayer Online Game Facilitating Communication Skill Development

This is my final year project at the University of Glasgow for the School of Computing Science.
This README file outlines the requirements, approach, features and licenses for this project.
A user manual is also provided which describes how to run the system.
At the end the technologies and external sources used are broken down, describing how each one contributed towards the system.

## Live Demonstration

```
Live demo: http://robert-pringle.com
```
*Disclaimer: This website will only be temporarily active, so may not be active anymore.*

## User Manual

For a breakdown of the file structure and instructions on how to run the program please see the UserManual.md present in the repository.

## Introduction

#### What is Explore MMO?

Explore MMO is a browser based multiplayer game which allows users to explore an extensive map. They can communicate with other players via a chat function and there is a series of quest to complete, designed to develop communication skills. The quests are also non-linear, where users hhave the option to complete the quests in any order they want. Once the playerh as completed all the quests they are able to replay the quests, continue to explore the map, meet new people and help anyone who is stuck.

#### Author

Robert Pringle:
  - personal email: pringle@live.co.uk
  - student email: 2304777p@student.gla.ac.uk

If you have any queries about Explore MMO please contact me using any of these emails.

#### Project's Requirements

This project developed a series of functional and non-functional requirements that conformed to the MoSCow method of assigning priority. They can be found in the repository in this directory: planning/requirements.md

## Features

This web application was created using Node JS and Express to hanlde the backend and serve files to the connected clients. JavaScript files are passed to the client to handle all the game mechanics. This game mechanics were created using a 2D web game framework called Phaser.

#### Real time Player Movement

* Players can see other player movements in real-time.
* Was achieved using JavaScript package socket.io, allowing for continous data streaming between all clients.
* Was essential so players could collaborate and complete quests.
* Sprites game assets used were copyright free and created by Sithjester. This link to the art is here: https://untamed.wild-refuge.net/rpgxp.php

#### Game World

* A detailed and immersive 2D map created using software called Tiled.
* Built using copyright free game art assets created by Pipoya and can be found here: https://pipoya.itch.io/pipoya-rpg-tileset-32x32?download


#### Quests to be completed
Using Phaser 5 quests were designed to develop communication skills, which are described in the dissertation, and they can be broken down as follows:

- Quest 1: Blindfolded Maze Navigation
- Quest 2: Coin Scanvenger Hunt
- Quest 3: Mountain Navigation Quest
- Quest 4: Blinded by Death Quest
- Quest 5: Sword Scanvenger Hunt

#### Database

MongoDB databe is used to store all chat logs, user details and user quest progression. Storing user quest progression allows player to start from where they left off when they login at a later date. 


#### JWT token security

All RESTful API requests are verified using JSON web tokens, and JSON web tokens are also used to verify user sessions allowing the system to be secure.

#### User Authentication
Users can register, login and reset their password

## License
* See LICENSE to see the MIT license for THIS REPOSITORY

## Technologies/External Sources

* Node.js | https://nodejs.org/en/ | JavaScript runtime used for backend
* Phaser | https://phaser.io | 2D game framework used to handle all game functionality
* Express | https://expressjs.com/ | Node.js web application framework
* Tiled | https://www.mapeditor.org/ | A tilemap editor used to build the in-game world
* npm | https://docs.npmjs.com/ | JavaScript package manager
* MongoDB | https://www.mongodb.com/ | used for database storage of user details, quest progress information and chat logs.
* bcryptjs | https://github.com/dcodeIO/bcrypt.js#readme |used for hashing password to be stored in MongoDB
* chai | https://www.chaijs.com/ | used for creating unit tests for the backend
* socket.io |https://github.com/socketio/socket.io#readme | used for allowing for real-time communication and real-time player movement
* nyc | https://istanbul.js.org/ | Used to display table of test information when unit tests are run
* mongoose | https://mongoosejs.com/ | Used for the backend to query the MongoDB database
* cookie-parser | https://github.com/expressjs/cookie-parser#readme | used to store JWT tokens with clients
* body-parser | https://www.npmjs.com/package/body-parser | parses incoming request bodies in a middleware before your handlers 
* jsonwebtoken | https://github.com/auth0/node-jsonwebtoken#readme | Used for JWT to vaidate sessions and user RESTful requests
* nodemailer | https://nodemailer.com/about/ | Used to send reset password link to users email
* Bootstrap 4 | https://getbootstrap.com | CSS framework used for registration, login and resetting password screens.
* Toastr | https://codeseven.github.io/toastr/ | javascript framework for pop-up notifications.
* Materialize | https://materializecss.com/ | CSS framework used for gameplay page to position elements
* jQuery | https://jquery.com |  JavaScript library used for html document manipulation and traversal.
