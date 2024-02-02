const User = require('../models/user');
const bcrypt = require('bcrypt');
const router = require('express').Router()

router.post('/register', async (req, res) => {
    
    try {
        const { username, password } = req.body;
        console.log(username)
        console.log(password)
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }


        const saltRounds = 10; 
        const hashedPassword = await bcrypt.hash(password, saltRounds);


        const newUser = new User({
            username,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


module.exports = router
//   const User = mongoose.model('User', {
//     username: String,
//     password: String,
//   });
