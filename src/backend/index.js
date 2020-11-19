const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

//Import the routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');

dotenv.config();

//Connecting to MongoDB database being hosted on https://cloud.mongodb.com/
mongoose.connect(
    process.env.DB_CONNECT,
    {useNewUrlParser:true, useUnifiedTopology:true},
);

mongoose.connection.on('error', (error) => {
  console.log(error);
  process.exit(1);
});
mongoose.connection.on('connected', function () {
  console.log('connected to mongo');
});

// Main routes
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

// Main routes
app.get('/register', function (req, res) {
  res.sendFile(__dirname + '/public/register.html');
});



//Middleware
app.use(express.json());
app.use(cors()); 
app.use(express.static(__dirname + '/public'));

//Create Route Middlewares
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);

 
// // catch all other routes
// app.use((req, res, next) => {
//   res.status(404);
//   res.json({ message: '404 - Not Found' });
// });

// // handles errors
// app.use((err, req, res, next) => {
//   res.status(err.status || 500);
//   res.json({ error : err });
// });


app.listen(3000, () => console.log('server up and running'));