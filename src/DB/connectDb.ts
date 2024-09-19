import mongoose from 'mongoose'

interface connected {
    isconnected : null | number
}
const connection:connected = {
    isconnected : null
}

export async function  connectToDatabase() {
    if(connection.isconnected){
        console.log("already connected")
        return;
    }
    try{
        const connection_string = process.env.dbstring
        const Db:typeof mongoose = await mongoose.connect(connection_string || 'none')
        console.log("database connected")
        connection.isconnected = Db.connections[0].readyState
    }catch(err){
        console.log(err)
    }
}
