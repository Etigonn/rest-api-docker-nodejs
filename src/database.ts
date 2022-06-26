import mongoose from "mongoose";
import config from './config/config'

mongoose.connect(config.DB.URI);

const connection = mongoose.connection;

connection.once('open', () =>{
    console.log('Mongodb connected')
})

connection.on('error', error =>{
    console.log(error);
    process.exit(0);
})