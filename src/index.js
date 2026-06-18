require("dotenv").config();
const connectDB = require("./db/database");

const PORT = process.env.PORT || 8000;

connectDB().then(() => {
    console.log(`Server running on port ${PORT}`);
}).catch((err) => {
    console.error("DB connection failed:", err);
});


//This code loads env vars, connects to MongoDB, and logs success or failure. If DB connects, it logs the port — if not, it logs the error.