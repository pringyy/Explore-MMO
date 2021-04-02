require("dotenv").config();
const express = require('express');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const bcrypt = require("bcryptjs");
const asyncMiddleware = require('../middleware/asyncMiddleware');
const UserModel = require('../model/user');
 
const email = process.env.EMAIL;
const pass = process.env.PASSWORD;

//Sets up email to send password reset links
const smtpTransport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: "exploremmog@gmail.com",
    pass: "RiCkRoLlEd2020"
  }
});

const router = express.Router();

router.post('/forgotPassword', asyncMiddleware(async (req, res, next) => {
    const { email } = req.body;

     //Finds the user with the email entered
    const user = await UserModel.findOne({ email });
    
    //Checks to see of email entered is on the system
    if (!user) {
      res.status(400).json({ 'message': 'invalid email' });
      return;
    }
   
    //Generates user token to send to user
    const buffer = crypto.randomBytes(20);
    const token = buffer.toString('hex');
   
    // update user reset password token and exp
    await UserModel.findByIdAndUpdate({ _id: user._id }, { resetToken: token, resetTokenExp: Date.now() + 600000 });
    
    //Constructs email to send
    const data = {
      to: user.email,
      from: email,
      subject: 'Explore MMO Password Reset',
      text: "You username is: " + user.username +". Reset you password using " + `${process.env.URL}${process.env.PORT || 3020}/resetPassword.html?token=${token}`,
    }

    //Sends email
    await smtpTransport.sendMail(data);
    res.status(200).json({message: 'A password reset link has been sent to your email and will only be valid for 10 minutes!' });
  }));

  router.post('/resetPassword', asyncMiddleware(async (req, res, next) => {
    const user = await UserModel.findOne({ resetToken: req.body.token, resetTokenExp: { $gt: Date.now() } });
    
    //If token is invalid inform users
    if (!user) {
      res.status(400).json({ 'message': 'invalid token' });
      return;
    }
   
    //Checks to see the password match and if not informs user
    if (req.body.password !== req.body.verifiedPassword) {
      res.status(400).json({ 'message': 'passwords do not match' });
      return;
    }

    //If passwoed match update the password using hashing
    const salt = await bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hashSync(req.body.password, salt);

    user.password = hashPassword;
    user.resetToken = undefined;
    user.resetTokenExp = undefined;
    await user.save();
   
    res.status(200).json({ message: 'password updated' });
  }));
   
  module.exports = router;