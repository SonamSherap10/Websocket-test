import {config} from 'dotenv'
config({quiet:true})

export const envConfig ={
    port : process.env.PORT,
    mongoURI : process.env.URI
}


