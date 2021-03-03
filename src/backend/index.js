require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const verify = require("./routes/verifyToken");
const routes = require("./routes/auth");
const passwordRoutes = require('./routes/password');
const asyncMiddleware = require("./middleware/asyncMiddleware");
const webtoken = require("jsonwebtoken");
const ChatSchema = require('./model/chat');
const userProgress = require('./model/userProgress');

//Establish connection to MongoDB database
const uri = process.env.DB_CONNECT;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

mongoose.connection.on("error", (error) => {
  console.log(error);
  process.exit(1);
});

mongoose.connection.on("connected", function () {
  console.log("connected to mongo");
});

//Starts express instance for phaser game
const app = express();
const server = require("http").Server(app);

const io = require("socket.io")(server,{
  cors: {
    allowedHeaders: ["test"],
    credentials: true
  }
});;

//variable used to store the active players on the server
const connectedPlayers = {};

io.on("connection", function (socket) {

  console.log(socket.handshake.query.name + " has connected to the server.");

  //Spawns a newly logged in player to the game
  connectedPlayers[socket.id] = {
    flipX: false,
    x: 2304,
    y: 3232,
    playerId: socket.id,
    name: socket.handshake.query.name,
  }

  socket.emit("currentPlayers", connectedPlayers);
  socket.broadcast.emit("newPlayer", connectedPlayers[socket.id]);

  //Sends the new players location to al lthe currently logged in players
  socket.broadcast.emit("newConnection", connectedPlayers[socket.id]);

  //Handles disconnect
  socket.on("disconnect", function () {
    console.log(socket.handshake.query.name + " has disconnected from the server");
    delete connectedPlayers[socket.id];
    io.emit("remove", socket.id);
  });
  
  //Handles moving players
  socket.on("playerMovement", function (data) {
    connectedPlayers[socket.id].x = data.x;
    connectedPlayers[socket.id].y = data.y;
    connectedPlayers[socket.id].flipX = data.flipX;
    socket.broadcast.emit("playerMoved", connectedPlayers[socket.id]);
  });
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//Used to pass static files to users on the website
app.use(express.static(__dirname + "/public"));


//Backend for when users send a message
app.post("/submitChat", verify, asyncMiddleware(async (req, res, next) => {

  const username = req.user.info.username + ":";
  const {message} = req.body;

  //Stores message in MongoDB
  ChatSchema.create({ username, message });

  //Broadcasts new message to all players on the server
  io.emit("new user message",{
    username,
    message,
  });
  res.status(200).json({ status: "ok" });
  })
);

//Backend used to update User Progress when a quest is completed
app.post("/completedQuest", verify, asyncMiddleware(async (req, res, next) => {
  const user = req.user.info.username;
  var quest = req.body.quest;
  var newvalues = { $set: {[quest]: true}};
  await userProgress.updateOne({username: user}, newvalues);
  res.status(200).json({ status: "Quest progress updated" });
}));

//Backend used to send user progress to the front end when requested
app.get("/questQuery", verify, asyncMiddleware(async (req, res, next) => {
  var user = req.user.info.username;
  var query = {"username": user};  
  const test = userProgress.find(query, '-username', {lean: true}, function(err, results){
    var numberCompleted =  Object.values(results[0]).filter(item => item === true).length
    res.send({result: results[0], number: numberCompleted, username:user})
  })
}));

//Sends the login page to the user
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");  
});

//Sends the register page to the user
app.get("/register", function (req, res) {
  res.sendFile(__dirname + "/public/register.html");
});

//Sends the forgot password page to the user
app.get("/forgotpassword", function (req, res) {
  res.sendFile(__dirname + "/public/forgotPassword.html");
});

//Sends the rgame page to the user
app.get("/play", verify, function (req, res) {
  res.sendFile(__dirname + "/public/game.html");
});

//Main routes
app.use("/", routes);
app.use('/', passwordRoutes);

//If route does not exist return 404 page
app.use((req, res, next) => {
  res.status(404).json({ message: "404 - Not Found" });
});

//Starts server on port 3020
server.listen(process.env.PORT || 3020, () => {
  console.log(`Server now listening on port ${process.env.PORT || 3020}`);
});

module.exports = server;