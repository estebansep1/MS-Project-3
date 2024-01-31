import express from 'express';
import { createServer as createHttpServer } from 'http';
import { Server } from 'socket.io';
import { dirname, join } from 'path';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import createServers from './config/createServer.js';

const app = express();
const server = createHttpServer(app);
const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

dotenv.config()

const _dirname = dirname("");
const buildPath = join(_dirname, "build");

app.use(express.static(buildPath));


mongoose 
    .connect(db)
    .then(() => {
        const app = createServers();
        const port = process.env.PORT || 5000;
        app.listen(port, () => {
            console.log(`App running on port ${port}`);
        });
    })
    .catch((err) => {
        console.log(`Could not connect to MongoDB and start the server`)
        console.log(err);
    })


io.on("connection", (socket) => {
    console.log('We are connected');
    
    socket.on("chat", chat => {
        io.emit('chat', chat);
    });
    
    socket.on('disconnect', () => {
        console.log('disconnected');
    });
});


server.listen(process.env.PORT, () => console.log(`Listening on Port ${process.env.PORT}`));







// app.get("*", function(req, res) {
//     const indexPath = join(_dirname, "../client/build/index.html");
//     console.log("Trying to send:", indexPath);

//     res.sendFile(indexPath, function (err) {
//         if (err) {
//             console.error("Error sending file:", err);
//             res.status(500).send(err);
//         } else {
//             console.log("File sent successfully");
//         }
//     });
// });