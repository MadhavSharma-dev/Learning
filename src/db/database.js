const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("Error:", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;

//After a database connection setup we have to write minimal lines of code in index.js to set it up to load env vars and call connectDB 