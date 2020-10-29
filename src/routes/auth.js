const router = require('express').Router();
const User = require('../model/user');
const bcrypt = require('bcryptjs');
const {registerValidation} = require('../validation');

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
		res.send(savedUser);
	}catch(err){
		res.status(400).send(err);
	}

});


module.exports = router;