const User = require('../models/user');

app.post('/register', async (req, res) => {
    console.log('test')
    try {
        const { username, password } = req.body;
        console.log(username)

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

<<<<<<< HEAD
module.exports = app;
=======
//   const User = mongoose.model('User', {
//     username: String,
//     password: String,
//   });

>>>>>>> 051333652e3fe3ce1744ebb2e6ef19bb43aa0f6a
