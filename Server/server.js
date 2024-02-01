const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;
const User = require('./models/user.js')

app.use(cors());
app.use(express.json());

<<<<<<< HEAD
const MONGO_URL = process.env.MONGO_URL

mongoose.connect(MONGO_URL, {
=======
// serve static front end in production mode
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, 'client', 'build')));
}

mongoose.connect(process.env.MONGO_URL, {
>>>>>>> f38fbf4de2f064aab0e20352762637f54a7602b8
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

<<<<<<< HEAD
const User = mongoose.model('User', {
  username: String,
  password: String,
});

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
=======
>>>>>>> f38fbf4de2f064aab0e20352762637f54a7602b8

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



