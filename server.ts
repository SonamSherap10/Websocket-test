import app from './src/app.js'
import {envConfig} from './src/config/config.js'


function startServer(){
    const port = envConfig.port
    app.listen(port,()=>{
     console.log(`server has started at ${port}`)
    })
}

startServer()