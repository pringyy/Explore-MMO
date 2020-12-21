require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const verify = require('./routes/verifyToken');
const routes = require('./routes/auth');
const asyncMiddleware = require('./middleware/asyncMiddleware');

//Establish connection to MongoDB database
const uri = process.env.DB_CONNECT;
mongoose.connect(uri, { useNewUrlParser : true, useCreateIndex: true, useUnifiedTopology: true  });
mongoose.connection.on('error', (error) => {
  console.log(error);
  process.exit(1);
});
mongoose.connection.on('connected', function () {
  console.log('connected to mongo');
});

//Starts express instance for phaser game
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
 
const connectedPlayers = {};
 
io.on('connection', function (socket) {
  console.log('a new user connected to server: ', socket.id);
  //Spawns a newly logged in player to the game
  connectedPlayers[socket.id] = {
    flipX: false,
    x: 2304,
    y: 3232,
    playerId: socket.id
  };
  //Sends where all the other players currently are to the new user
  socket.emit('currentPlayers', connectedPlayers);
  socket.broadcast.emit('newPlayer', connectedPlayers[socket.id]);

  //Sends the new players location to al lthe currently logged in players
  socket.broadcast.emit('newConnection', connectedPlayers[socket.id]);
 
  //Handles disconnect
  socket.on('disconnect', function () {
    console.log('a user disconnected from server: ', socket.id);
    delete connectedPlayers[socket.id];
    io.emit('remove', socket.id);
  });
 
  //Handles moving players
  socket.on('playerMovement', function (data) {
    connectedPlayers[socket.id].x = data.x;
    connectedPlayers[socket.id].y = data.y;
    connectedPlayers[socket.id].flipX = data.flipX
    socket.broadcast.emit('playerMoved', connectedPlayers[socket.id]);
  });
});


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors()); 


app.use(express.static(__dirname + '/public'));

app.post('/submitChat', asyncMiddleware(async (req, res, next) => {
  const { message } = req.body;
  const  name  = req.body.username;
  // await ChatModel.create({ email, message });
  io.emit('new user message', {
    username: name,
    message,
  });
  res.status(200).json({ status: 'ok' });
}));
 
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/register', function (req, res) {
  res.sendFile(__dirname + '/public/register.html');
});

app.get('/play', function (req, res) {
  res.sendFile(__dirname + '/public/game.html');
});

// main routes
app.use('/', routes);

//If route does not exist return 404 page
app.use((req, res, next) => {
  res.status(404).json({ message: '404 - Not Found' });
});

//Starts server on port 3000
server.listen(process.env.PORT || 3020, () => {
  console.log(`Server now listening on port ${process.env.PORT || 3000}`);
});
