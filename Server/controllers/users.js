const bcrypt = require('bcrypt');
const User = require('../models/user'); 

app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Hash the password
        const saltRounds = 10; // You can adjust the number of rounds
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create a new user with the hashed password
        const newUser = new User({
            username,
            password: hashedPassword, // Store the hashed password
        });

        // Save the new user
        await newUser.save();

        // Respond
        res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = app;