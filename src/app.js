const express  = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cors());

app.use(express.json({limit : "16kb"}))
app.use(express.urlencoded({extended : true , limit : "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())
module.exports = app;

//Cookie - parser is needed whenever you deal with cookies (auth tokens, sessions, etc.)
// cors — almost always needed to handle cross-origin requests (frontend talking to backend)
 