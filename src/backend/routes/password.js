
const express = require('express');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const bcrypt = require("bcryptjs");
const asyncMiddleware = require('../middleware/asyncMiddleware');
const UserModel = require('../model/user');
 
const email = process.env.EMAIL;
const pass = process.env.PASSWORD;

const smtpTransport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'exploremmog@gmail.com',
    pass: 'RiCkRoLlEd2020'
  }
});

const router = express.Router();

router.post('/forgotPassword', asyncMiddleware(async (req, res, next) => {
    const { email } = req.body;

    const user = await UserModel.findOne({ email });
    
    if (!user) {
      res.status(400).json({ 'message': 'invalid email' });
      return;
    }
   
    // create user token
    const buffer = crypto.randomBytes(20);
    const token = buffer.toString('hex');
   
    // update user reset password token and exp
    await UserModel.findByIdAndUpdate({ _id: user._id }, { resetToken: token, resetTokenExp: Date.now() + 600000 });
    
    // send user password reset email
    const data = {
      to: user.email,
      from: email,
      subject: 'Explore MMO Password Reset',
      text: "You username is: " + user.username +". Reset you password using " + `${process.env.URL}${process.env.PORT || 3020}/resetPassword.html?token=${token}`,
      }
  
    await smtpTransport.sendMail(data);
 
    res.status(200).json({message: 'A password reset link has been sent to your email and will only be valid for 10 minutes!' });
  }));

  router.post('/resetPassword', asyncMiddleware(async (req, res, next) => {
    const user = await UserModel.findOne({ resetToken: req.body.token, resetTokenExp: { $gt: Date.now() } });
    if (!user) {
      res.status(400).json({ 'message': 'invalid token' });
      return;
    }
   
    // ensure provided password matches verified password
    if (req.body.password !== req.body.verifiedPassword) {
      res.status(400).json({ 'message': 'passwords do not match' });
      return;
    }
    // update user model

    const salt = await bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hashSync(req.body.password, salt);

    user.password = hashPassword;
    user.resetToken = undefined;
    user.resetTokenExp = undefined;
    await user.save();
   
    res.status(200).json({ message: 'password updated' });
  }));
   
  module.exports = router;