import mongoose from "mongoose";
import { envConfig } from "./config.js";

async function connectDb(){
    try{
        mongoose.connection.on("connected",()=>{
            console.log("Database connection successful")
        })
       await mongoose.connect(envConfig.mongoURI as string)
    }catch(error){
        console.log(error)
        process.exit(1)
    }
 }

 export default connectDb