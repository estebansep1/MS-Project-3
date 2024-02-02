const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5001;
const path = require('path')
const User = require('./models/user.js')
require('dotenv').config()

app.use(cors());
app.use(express.json());

// serve static front end in production mode
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, 'client', 'build')));
}

mongoose 
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log('connected to mongo db')
    })

    .catch((err) => {
        console.log(`Could not connect to MongoDB and start the server`)
        console.log(err);
    })

app.use('/users', require('./controllers/users'))

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


app.use('/users', require('./controllers/users'))
