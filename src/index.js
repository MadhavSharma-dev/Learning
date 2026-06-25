require("dotenv").config();
const connectDB = require("./db/database");
const app = require("./app");

const PORT = process.env.PORT || 8000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch((err) => {
    console.error("DB connection failed:", err);
});

// Loads env vars, connects to MongoDB, then starts the Express server on the given port.