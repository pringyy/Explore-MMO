const router = require('express').Router();
const User = require('../model/user');
const bcrypt = require('bcryptjs');
const {registerValidation, loginValidation} = require('../validation');

//Register
router.post('/register', async (req,res) => {
	const {error} = registerValidation(req.body);

	//Sends error message if data is not valid
	if (error) return res.status(400).send(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
		
	//Checks if user details are already in the database
	const usernameExist = await User.findOne ({username: req.body.username})
	const emailExist = await User.findOne ({email: req.body.email})	

	//Returns required information to the user
	if(emailExist && usernameExist) return res.status(400).send('Email and Username already exists');
	if(emailExist) return res.status(400).send('Email already exists');
	if(usernameExist) return res.status(400).send('Username already exists');

	//Hashes the password using Bcrypt
	const salt = await bcrypt.genSaltSync(10);
	const hashPassword = await bcrypt.hashSync(req.body.password, salt);

	//Creates a new user
	const user = new User({
		username: req.body.username,
		email: req.body.email,
		password: hashPassword
	});

	try{
		const savedUser = await user.save();
		res.send('Registered Successfully');
	}catch(err){
		res.status(400).send(err);
	}

});

//Login
router.post('/login', async (req,res) => {
	const {error} = loginValidation(req.body);

	//Sends error message if data is not valid
	if (error) return res.status(400).send(`Validation error: ${error.details.map(x => x.message).join(', ')}`);

	//Checks if username exists
	const usernameExist = await User.findOne ({username: req.body.username});
	if(!usernameExist) return res.status(400).send('Incorrect username or password');

	//Checks if password is correct to the corresponding username
	const validPassword = await bcrypt.compare(req.body.password, usernameExist.password);
	if(!validPassword) return res.status(400).send('Invalid username or password')

	res.send('Success');

});

module.exports = router;