const mongoose = require("mongoose");

const dbConnection = async()=>{
    try {
        mongoose.connect(process.env.MONGODB_CNN);

        console.log('Connecting successfully - DB online');

    } catch (error) {
        console.log(error);
        throw new Error("Couldn't connect to Mongo");
    }
}

module.exports = {
    dbConnection
}