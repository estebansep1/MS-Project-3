const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const server = require("http").createServer(app); // Step 2: Create an HTTP server
const { Server } = require("socket.io"); // Step 1: Import Socket.IO
const io = new Server(server, {
  // Step 3: Initialize Socket.IO
  cors: {
    origin: "*",
  },
});
const PORT = process.env.PORT || 5001;
const path = require("path");
require("dotenv").config();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Could not connect to MongoDB and start the server");
    console.log(err);
  });


  io.on("connection", (socket) => {
    console.log('A user has connected');
  
    socket.on("chat", (chat) => {
      io.emit('chat', chat);
    });
  
    socket.on("user-login", (userInfo) => {
      console.log(`User ${userInfo.user} has logged in with avatar ${userInfo.avatar}`);
    });
  
    socket.on('disconnect', () => {
      console.log('A user has disconnected');
    });
  });

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));
}

app.use(cors());
app.use(express.json());

app.use("/users", require("./controllers/users"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
