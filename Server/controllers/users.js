const User = require('../models/user');


app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const newUser = new User({
            username,
            password,
        });


        await newUser.save();


        res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


//   const User = mongoose.model('User', {
//     username: String,
//     password: String,
//   });

