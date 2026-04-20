import {config} from 'dotenv'
config()

export const envConfig ={
    port : process.env.PORT,
    mongoURI : process.env.URI
}


