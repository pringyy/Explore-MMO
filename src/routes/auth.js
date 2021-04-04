const express = require("express");
const router = require("express").Router();
const User = require("../model/user");
const bcrypt = require("bcryptjs");
const webtoken = require("jsonwebtoken");
const { registerValidation, loginValidation } = require("../validation");
const asyncMiddleware = require("../middleware/asyncMiddleware");
const userProgress = require("../model/userProgress");
const tokenList = {};

//Backend functionality for registering
router.post("/register",asyncMiddleware(async (req, res) => {
    
  const { error } = registerValidation(req.body);

  //Sends error message if data is not valid
  if (error)
    return res
      .status(400)
      .send(error.details.map((x) => x.message).join(", "));

  //Checks if user details are already in the database
  const usernameExist = await User.findOne({ username: req.body.username });
  const emailExist = await User.findOne({ email: req.body.email });

  //Returns required information to the user
  if (emailExist && usernameExist) return res.status(400).send("Email and Username already exists");
  if (emailExist) return res.status(400).send("Email already exists");
  if (usernameExist) return res.status(400).send("Username already exists");

  //Hashes the password using Bcrypt
  const salt = await bcrypt.genSaltSync(10);
  const hashPassword = await bcrypt.hashSync(req.body.password, salt);

  //Creates a new user
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashPassword,
  });

  //Creates a new user a user progress record
  const userprogress = new userProgress({
    username: req.body.username,
  });

  //Tries to save the user to MongoDB
  try {
    await user.save();  
    await userprogress.save(); 
    res.send("Success");
  } catch (err) {
    res.status(400).send(err);
  }
}));

//Backend functionality for logging in
router.post("/login",asyncMiddleware(async (req, res) => {
    
  const { error } = loginValidation(req.body);

  //Checks if username exists
  const user = await User.findOne({ username: req.body.username });

  if (!user) {
    return res.status(400).send("Incorrect username or password");
  }

  //Checks if passwords match
  const validPassword = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!validPassword) return res.status(400).send("Invalid username or password");
	  
	const body = {
		_id: user._id,
		email: user.email,
		username: user.username,
	};

  //Creates and signs a JSON webtoken
  const token = webtoken.sign({info: body}, process.env.TOKEN_SECRET, {
    expiresIn: 300,
	});
  
  //Creates and signs a refresh JSON token
  const refreshToken = webtoken.sign({info: body}, process.env.TOKEN_SECRET, { 
    expiresIn: 10000, 
  });

  //Creates cookies for session validation
  res.cookie("access_token", token);
  res.cookie("refreshJwt", refreshToken);

  //Stores a new token in memory
  tokenList[refreshToken] = {
    token,
    refreshToken,
    email: user.email,
    _id: user._id,
    username: user.username,
  };

  //sends the cookies to the user
  return res.status(200).json({token, refreshToken});
}));

//Backend functionality for updating tokens
router.post("/token", (req, res) => {
  const { refreshToken } = req.body;

  if (refreshToken in tokenList) {
    const body = {
      email: tokenList[refreshToken].email,
      _id: tokenList[refreshToken]._id,
      username: tokenList[refreshToken].username,
    };

    //Signs the new JSON webtoken
    const token = webtoken.sign({info: body}, process.env.TOKEN_SECRET, {
      expiresIn: 300,
    });

    //Update the JSON webtoken
    res.cookie("access_token", token);
    tokenList[refreshToken].token = token;

    //Sends updated JSON webtoken to the user
    res.status(200).json({ token });
  } else {
    res.status(401).json();
  }
});


//Backend functionality for logging a user out
router.post("/logout", (req, res) => {

  if (req.cookies) {
    const refreshToken = req.body['refreshToken'];

    if (refreshToken in tokenList) {
      delete tokenList[refreshToken]; 
      res.clearCookie("refreshJwt");
      res.clearCookie("access_token");
      res.status(200).json({ message: "logged out" });
    } else {
      res.status(401).json();
    }
  } else {
    res.status(401).json();
  }
});

//Backend functionality for deleting an account for testing purposes
router.post("/deleteAccount",asyncMiddleware(async (req, res) => {
  User.deleteOne({ username: req.body.username }, function(err, result) {
      res.send(result);
  });
}));

module.exports = router;