# Explore MMO: A Massively Multiplayer Online Game Facilitating Communication Skill Development

This is my final year project at the University of Glasgow for the School of Computing Science.
This README file outlines the requirements, approach, features and licenses for this project.
A user manual is also provided which describes how to run the system.

## Live Demonstration

```
Live demo: http://robert-pringle.com
```
*Disclaimer: This website will only be temporarily active, so may not be active anymore.*

## Installation Guide

If you want to run the program please see the UserManual.md present in the repository.

## Introduction

#### What is Explore MMO?
Explore MMO is a browser based multiplayer game which allows users to explore an extensive map. They can communicate with other players via a chat function and there is a series of quest to complete, designed to develop communication skills. The quests are also non-linear, where users hhave the option to complete the quests in any order they want. Once the playerh as completed all the quests they are able to replay the quests, continue to explore the map, meet new people and help anyone who is stuck.

#### Author

Robert Pringle:
  - personal email: pringle@live.co.uk
  - student email: 2304777p@student.gla.ac.uk


If you have any queries about Explore MMO please contact me using any of these emails.

#### Dependencies
This is a Node JS and Express web application, and using the npm package manager a list of dependencies was automatically generated as each one was added when installed. If you want to see a list of all JavaScript technology dependencies used for this project, they can be found in the directory: src/package.json

#### Project's Requirements
This project developed a series of functional and non-functional requirements that conformed to the MoSCow method of assigning priority. They can be found in the repository in this directory: planning/requirements.md

## Features

This web application was created using Node JS and Express to hanlde the backend and serve files to the connected clients. JavaScript files are passed to the client to handle all the game mechanics. This game mechanics were created using a 2D web game framework called Phaser.

### Real time Player Movement

* Players can see other player movements in real-time.
* Was achieved using JavaScript package socket.io, allowing for continous data streaming between all clients.
* Was essential so players could collaborate and complete quests.

### Game World

* A detailed and immersive 2D map created using software called Tiled.
* Built using copyright free game art assets created by Pipoya and can be found here: https://pipoya.itch.io/pipoya-rpg-tileset-32x32?download


### Quests to be completed
Using Phaser 5 quests were designed to develop communication skills, which are described in the dissertation, and they can be broken down as follows:

- Quest 1: Blindfolded Maze Navigation
- Quest 2: Coin Scanvenger Hunt
- Quest 3: Mountain Navigation Quest
- Quest 4: Blinded by Death Quest
- Quest 5: Sword Scanvenger Hunt

### Login



### JWT token security

All RESTful API requests are verified using JSON web tokens, and JSON web tokens are also used to verify user sessions allowing the system to be secure.


 

Users ca

### Registration



## Licenses
* See MIT Licene for the license for THIS REPOSITORY

## Technologies/External Sources
