const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

//Connecting to MongoDB database being hosted on https://cloud.mongodb.com/
mongoose.connect(
    process.env.DB_CONNECT,
    {useNewUrlParser:true, useUnifiedTopology:true},
    () => console.log('successfully connected to database')
);

//Import the routes
const authRoute = require('./routes/auth');

//Create Route Middlewares
app.use('/api/user', authRoute);


app.listen(3000, () => console.log('server up and running'));