# User Manual

This file will describe how to run the web application on your system and providing instructions on how to run the testing suite. Please follow all the step in order to set this up successfully. If you are struggling with any of the setup or have any queries, please contact me using information provided on the [README](README.md). 

## Installation Guide

***The installation guide has only been tested on MacOS as the developer does not have a Windows PC***

**Important:** to run this application you need to have internet connection in order to connect to the MongoDB database.

The [.env](src/.env) file contains the link that connects the web application to the MongoDB server, if you want to use your own server just replace that link.

**Step 1:** Download Node.js onto your system using the following link: https://nodejs.org/en/download/

**Step 2:** Using your console navigate to the [src](src) folder present in the repository

**Step 3:** In order to install all the depenencies required, run the command:
``` npm install ```

**Step 4:** Now to start the application, run the command:
``` npm start ```

**Step 5:** Now go to your web browser and navigate to: http://localhost:3020 


## Running Unit Tests

**Important:** to run unit tests you need to have internet connection in order to connect to the MongoDB database.

**Step 1:** Complete the Installation guide described above

**Step 2:** Using your console navigate to the [src](src) folder present in the repository

**Step 3:** Run the command: 
```npm test```
