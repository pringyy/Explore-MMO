const express = require("express");
const router = require("express").Router();
const User = require("../model/user");
const bcrypt = require("bcryptjs");
const webtoken = require("jsonwebtoken");
const { registerValidation, loginValidation } = require("../validation");

const asyncMiddleware = require("../middleware/asyncMiddleware");
const userProgress = require("../model/userProgress");


const tokenList = {};

//Register
router.post(
  "/register",
  asyncMiddleware(async (req, res) => {
    const { error } = registerValidation(req.body);

    //Sends error message if data is not valid
    if (error)
      return res
        .status(400)
        .send(
          error.details.map((x) => x.message).join(", ")
        );

    //Checks if user details are already in the database
    const usernameExist = await User.findOne({ username: req.body.username });
    const emailExist = await User.findOne({ email: req.body.email });

    //Returns required information to the user
    if (emailExist && usernameExist)
      return res.status(400).send("Email and Username already exists");
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

    const userprogress = new userProgress({
      username: req.body.username,
    });


    try {
      await user.save();  
       await userprogress.save(); res.send("Test Successfully");
    } catch (err) {
      res.status(400).send(err);
    }
  })
);

//Login
router.post(
  "/login",
  asyncMiddleware(async (req, res) => {
    const { error } = loginValidation(req.body);

    //Checks if username exists
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
  
      return res.status(400).send("Incorrect username or password");
	}
    //Checks if password entered matches the usernames actual password
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


    //Create and assign a JSON web token
    const token = webtoken.sign({info: body}, process.env.TOKEN_SECRET, {
      expiresIn: 300,
	});
	
    const refreshToken = webtoken.sign(
      { info: body },
      process.env.TOKEN_SECRET,
      { expiresIn: 10000 }
    );

    res.cookie("access_token", token);
    res.cookie("refreshJwt", refreshToken);


    // store tokens in memory
    tokenList[refreshToken] = {
      token,
      refreshToken,
      email: user.email,
      _id: user._id,
      username: user.username,
    };

    return res.status(200).json({ token, refreshToken });
  })
);

router.post("/token", (req, res) => {
  const { refreshToken } = req.body;
  if (refreshToken in tokenList) {
    const body = {
      email: tokenList[refreshToken].email,
      _id: tokenList[refreshToken]._id,
      username: tokenList[refreshToken].username,
    };

    const token = webtoken.sign({info: body}, process.env.TOKEN_SECRET, {
      expiresIn: 300,
    });

    // update jwt
    res.cookie("access_token", token);
    tokenList[refreshToken].token = token;
  

    res.status(200).json({ token });
  } else {
    res.status(401).json();
  }
});

router.post("/logout", (req, res) => {
  if (req.cookies) {
    const refreshToken = req.body['refreshToken'];
    console.log(refreshToken);
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


router.post("/deleteAccount",asyncMiddleware(async (req, res) => {
  User.deleteOne({ username: req.body.username }, function(err, result) {
      res.send(result);
  });
}));


module.exports = router;
