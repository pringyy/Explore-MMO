# Explore MMO: A Massively Multiplayer Online Game Facilitating Communication Skill Development

This is my final year project at the University of Glasgow for the School of Computing Science.
This README provides a breif outline of the file structure and the game.
**A [user manual](manual.md) is also provided which describes how to run the system.**
At the end of this README the **technologies and external sources** used are broken down, describing how each one contributed towards the system.

## Live Demonstration

```
Live demo: http://robert-pringle.com
```
*Disclaimer: This website will only be temporarily active, so may not be active anymore.*

## User Manual

To see how to run the program please see [manual.md](manual.md) in the repository.

## File Structure
* [.github/workflows/](.github/workflows) - contains files used for the Continous Integration on Github
* [dissertation/](dissertation) - contains the dissertation Latex files
* [evaluation/](evaluation) - contains all raw data taken from different evaluations throughout the project
* [meeting/](meeting) - contains all meeting minutes with my advisor
* [presentation/](presentation) - contains presentation files demonstraiting the project
* **[src/](src) - contains all the code for the project**
* [status_report/](status_report) - contains the progress report submitted to the University in December
* [.gitignore](.gitignore) - contains files which are automatically ignored by Git
* [LICENSE](LICENSE) - contains the MIT license information for the project
* [manual.md](manual.md) - contains the user manual which provides instructions on how to run the code
* [plan.md](plan.md) - contains the orignal plan for the project development
* [timelog.md](timelog.md) - contains a log of time spent on the project

## Introduction

#### What is Explore MMO?

Explore MMO is a browser based multiplayer game which allows users to explore an extensive map. They can communicate with other players via a chat function and there is a series of quest to complete, designed to develop communication skills. The quests are also non-linear, where users hhave the option to complete the quests in any order they want. Once the playerh as completed all the quests they are able to replay the quests, continue to explore the map, meet new people and help anyone who is stuck.

#### Author

Robert Pringle:
  - personal email: pringle@live.co.uk
  - student email: 2304777p@student.gla.ac.uk

If you have any queries about Explore MMO please contact me using any of these emails.

## Application Screenshots

* An online library of different screenshots from the game can be found here: https://imgur.com/a/BCNljDq
* This highlights different features implemented as discussed below.

## Features

This web application was created using Node JS and Express to hanlde the backend and serve files to the connected clients. JavaScript files are passed to the client to handle all the game mechanics. This game mechanics were created using a 2D web game framework called Phaser.

#### Real time Player Movement

* Players can see other players' sprite movements in real-time.
* Was achieved using JavaScript package socket.io, allowing for continous data streaming between all clients.
* Was essential so players could collaborate and complete quests.
* All sprite game assets used were copyright free and created by Sithjester. This link to the art is here: https://untamed.wild-refuge.net/rpgxp.php

#### Game World

* A detailed and immersive 2D map created using software called Tiled.
* Built using copyright free game art assets created by Pipoya and can be found here: https://pipoya.itch.io/pipoya-rpg-tileset-32x32?download
* Collisions layers were created so Phaser can handle not letting players overlap certain objects (like walls and trees)
* All houses in the map can be entered.

#### Text-based chat

* Players communicate using a text-based chat
* This is an improtant feature as the game aims to develop communication skills
* Without this no communication would be possible on the wbe application

#### Quests to be completed
Using Phaser, 5 quests were designed to develop communication skills, dicussed further in dissertation, and they can be broken down as follows

- Quest 1: Players need to navigate a player who cannot see their character movement to the end of the quest using the chat
- Quest 2: Players need to find 10 sets of coins scattered around the map in 10 minutes
- Quest 3: Players need to navigate to the top of a mountain while an other player communicates the route from the opposite side of the map
- Quest 4: Players need to navigate a player who cannot see from the graveyard to the church in 5 minutes
- Quest 5: Players need to find 7 swords scattered around the map in 5 minutes

#### Database

A MongoDB database is used to store all chat logs, user details and user quest progression. Storing user quest progression allows player to start from where they left off when they login at a later date. 

#### JWT token security

All RESTful API requests are verified using JSON web tokens, and JSON web tokens are also used to verify user sessions allowing the system to be secure.

#### User Authentication
Users can register, login and reset their password

## License
* See [LICENSE](LICENSE) to see the MIT license for THIS REPOSITORY

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
