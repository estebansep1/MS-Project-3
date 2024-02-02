import express from 'express';
import { createServer as createHttpServer } from 'http';
import { Server } from 'socket.io';
import { dirname, join } from 'path';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors'
dotenv.config()





const app = express();
app.use(cors())
// const server = createHttpServer(app);
// const io = new Server(server, {
//     cors: {
//         origin: "*"
//     }
// });


const _dirname = dirname("");
const buildPath = join(_dirname, "build");

app.use(express.static(buildPath));

mongoose 
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log('connected to mongo db')
    })

    .catch((err) => {
        console.log(`Could not connect to MongoDB and start the server`)
        console.log(err);
    })

// io.on("connection", (socket) => {
//     console.log('We are connected');
    
//     socket.on("chat", chat => {
//         io.emit('chat', chat);
//     });
    
//     socket.on('disconnect', () => {
//         console.log('disconnected');
//     });
// });

app.listen(process.env.PORT, () => console.log(`Listening on Port ${process.env.PORT}`));