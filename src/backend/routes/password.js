
const express = require('express');
const hbs = require('nodemailer-express-handlebars');
const nodemailer = require('nodemailer');
const path = require('path');
const crypto = require('crypto');
const bcrypt = require("bcryptjs");
const asyncMiddleware = require('../middleware/asyncMiddleware');
const UserModel = require('../model/user');
 
const email = process.env.EMAIL;
const pass = process.env.PASSWORD;
console.log(pass)
const smtpTransport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'exploremmog@gmail.com',
    pass: 'RiCkRoLlEd2020'
  }
});

console.log("HEY    " + smtpTransport)


 
const handlebarsOptions = { 
  viewEngine: 'handlebars',
  viewPath: path.resolve('./templates/'),
  extName: '.html'
};
 
smtpTransport.use('compile', hbs(handlebarsOptions);
 
const router = express.Router();

router.post('/forgot-password', asyncMiddleware(async (req, res, next) => {
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
    console.log("test1")
    await UserModel.findByIdAndUpdate({ _id: user._id }, { resetToken: token, resetTokenExp: Date.now() + 600000 });
   console.log("test")
    // send user password reset email
    const data = {
      to: user.email,
      from: email,
      template: './forgot-password',
      subject: 'Phaser Leaderboard Password Reset',
      context: {
        url: `http://localhost:${process.env.PORT || 3020}/reset-password.html?token=${token}`,
        name: user.name
      }
    };
    console.log(data.context.url)
    await smtpTransport.sendMail(data);
    console.log("test5")
    res.status(200).json({ message: 'An email has been sent to your email. Password reset link is only valid for 10 minutes.' });
  }));

  router.post('/reset-password', asyncMiddleware(async (req, res, next) => {
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