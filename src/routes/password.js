require("dotenv").config();
const express = require('express');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const bcrypt = require("bcryptjs");
const asyncMiddleware = require('../middleware/asyncMiddleware');
const User = require('../model/user');

const email = process.env.EMAIL;
const pass = process.env.PASSWORD;

//Sets up email to send password reset links
const smtpTransport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: email,
    pass: pass
  }
});

const router = express.Router();

router.post('/forgotPassword', asyncMiddleware(async (req, res, next) => {
  const {email} = req.body;

  //Cehcks if email is in datavase
  const user = await User.findOne({email});
  
  //Checks to see of email entered is on the system
  if (!user) {
    res.status(400).json({ 'message': 'email does not exists' });
    return;
  }
  
  //Generates user token to send to user
  const buff = crypto.randomBytes(20);
  const resetToken = buff.toString('hex');
  
  // update user reset password token and exp
  await User.findByIdAndUpdate({ _id: user._id }, { resetToken: token, resetTokenExp: Date.now() + 300000 });
  
  //Constructs email to send
  const data = {
    to: user.email,
    from: email,
    subject: 'Explore MMO Password Reset',
    text: "You username is: " + user.username +". Reset you password using " + `${process.env.URL}${process.env.PORT || 3020}/resetPassword.html?token=${token}`,
  }

  //Sends email
  await smtpTransport.sendMail(data);
  res.status(200).json({message: 'A password reset link has been sent to your email and will only be valid for 5 minutes!' });
}));

router.post('/resetPassword', asyncMiddleware(async (req, res, next) => {
  const user = await User.findOne({ resetToken: req.body.token, resetTokenExp:{$gt: Date.now()}});
  
  //If token is invalid inform users
  if (user == false) {
    res.status(400).json({'message': 'Error please try again' });
    return;
  }

  //Checks to see the password match and if not informs user
  if (req.body.verifiedPass !== req.body.password) {
    res.status(400).json({'message': 'Passwords do not match' });
    return;
  }

  //If passwords match update the password using hashing
  const salt = await bcrypt.genSaltSync(10);
  const hashPassword = await bcrypt.hashSync(req.body.password, salt);

  user.resetToken = undefined;
  user.resetTokenExp = undefined;
  user.password = hashPassword;
  await user.save();
  res.status(200).json({message: 'Password Sucessfully Updated!'});
}));
   
module.exports = router;