const router = require('express').Router();
const User = require('../model/user');
const {registerValidation} = require('../validation');


router.post('/register', async (req,res) => {
	const {error} = registerValidation(req.body);
	if (error){
		//Sends error message of what information is inputted wrong
		res.send(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
	} else {

		//Adds user to database if correct
		const user = new User({
			username: req.body.username,
			email: req.body.email,
			password: req.body.password
		});

		try{
			const savedUser = await user.save();
			res.send(savedUser);
		}catch(err){
			res.status(400).send(err);
		}
	}
});


module.exports = router;