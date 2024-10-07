const mongoose = require('mongoose');
require('dotenv').config();

const DBURL = process.env.DBURL;

const ConnectDB = async () => {
    try {
        await mongoose.connect(DBURL);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    }
};

module.exports = ConnectDB;
