const express = require('exporess')
const http = require('http')
const Server = require("socket.io").Server
const app = express()
const path = require('path')

const server = http.createServer(app)
const io = http.createServer(server, {
    cors:{
        origin: "*"
    }
})

const _dirname = path.dirname("")
const buildPath = path.join(_dirname, "build")

app.use(express.static(buildPath))

app.get("*", function(req, res) {
    res.sendFile(
        path.join(_dirname, "../client/build/index.html"),
        function (err) {
            if (err) {
                res.status(500),send(err);
            }
        }
    )
})


io.on("connection", (socket) => {
    console.log('We are connected')

    socket.on("chat", chat => {
        io.emit('chat', chat)
    })
})

server.listen(5001, () => console.log('We are listening on port 5001'))