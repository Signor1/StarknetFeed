const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URL = process.env.MONGO_URL;

mongoose.connection.once('open', () => {
    console.log("Mongo DB connected...");
});

mongoose.connection.on('error', (err) => {
    console.log(err);
});

async function connectDB() {
   await mongoose.connect(MONGO_URL);
}

async function disconnectDB() {
    await mongoose.disconnect();
}

module.exports = {
    connectDB,
    disconnectDB,
}
