import app from './src/app.js'
import { envConfig } from './src/config/config.js'
import connectDb from './src/config/db.js'
import { Server } from 'socket.io'

let io: Server | undefined;

function startServer() {
    connectDb();
    const port = envConfig.port;
    const server = app.listen(port, () => {
        console.log(`server has started at ${port}`);
    });
    io = new Server(server);
    
    import('./src/todo/todoController.js');  
}

function getServer() {
    if (!io) {
        throw new Error("socket hasnt been initated");
    }
    return io;
}

startServer();
export { getServer };