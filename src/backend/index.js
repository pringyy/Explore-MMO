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
const { collection } = require("./model/chat");
const { number } = require("@hapi/joi");

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

const connectedPlayers = {};

io.on("connection", function (socket) {

  console.log("a new user connected to server: ", socket.id);
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
    console.log("a user disconnected from server: ", socket.id);
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

app.use(express.static(__dirname + "/public"));

app.post("/submitChat", verify, asyncMiddleware(async (req, res, next) => {
  const username = req.user.info.username + ":";
  const {message} = req.body;
  ChatSchema.create({ username, message });
  io.emit("new user message", {
    username,
    message,
  });
  res.status(200).json({ status: "ok" });
  })
);

app.post("/completedQuest", verify, asyncMiddleware(async (req, res, next) => {
  const user = req.user.info.username;
  var quest = req.body.quest;
  console.log(req.body.quest);
  console.log(user);
  var newvalues = { $set: {[quest]: true}};
  await userProgress.updateOne({username: user}, newvalues);
  })
);

app.get("/questQuery", verify, asyncMiddleware(async (req, res, next) => {
  var user = req.user.info.username;


  
  var query = {"username": user};  
  
  const test = userProgress.find(query, '-username', {lean: true}, function(err, results){
    var numberCompleted =  Object.values(results[0]).filter(item => item === true).length
    res.send({result: results[0], number: numberCompleted, username:user})
  })
}));




app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
  
});

app.get("/register", function (req, res) {
  res.sendFile(__dirname + "/public/register.html");
});

app.get("/play", verify, function (req, res) {
  res.sendFile(__dirname + "/public/game.html");
});

// main routes
app.use("/", routes);
app.use('/', passwordRoutes);

//If route does not exist return 404 page
app.use((req, res, next) => {
  res.status(404).json({ message: "404 - Not Found" });
});

//Starts server on port 3000
server.listen(process.env.PORT || 3020, () => {
  console.log(`Server now listening on port ${process.env.PORT || 3000}`);
});

