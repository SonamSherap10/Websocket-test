import app from './src/app.js'
import { envConfig } from './src/config/config.js'
import connectDb from './src/config/db.js'
import { Server } from 'socket.io'

function startServer() {
    connectDb()
    const port = envConfig.port
    const server = app.listen(port, () => {
        console.log(`server has started at ${port}`)
    })
    const io = new Server(server)
    io.on("connection", (socket) => {
        console.log("socket connection is active", socket.id)
    })
}

startServer()  