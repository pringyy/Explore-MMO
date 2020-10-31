const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
//Import the routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');

dotenv.config();

//Connecting to MongoDB database being hosted on https://cloud.mongodb.com/
mongoose.createConnection(
    process.env.DB_CONNECT,
    {useNewUrlParser:true, useUnifiedTopology:true},
    () => console.log('successfully connected to database')
);


//Middleware
app.use(express.json());

//Create Route Middlewares
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);


app.listen(3000, () => console.log('server up and running'));