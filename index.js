const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const crypto = require("crypto");
const helmet = require("helmet");
const morgan = require("morgan");
const jwt = require('jsonwebtoken'); 
// const Token = require('./src/models/token');
const  {authenticate}  = require("./src/middlewares/authenticate");



require("dotenv").config();

const app = express();

app.use(cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    next();
});

app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.set("json spaces", 4);
app.use(express.urlencoded({ extended: true }));

const generateTokenSecret = () => {
    return crypto.randomBytes(64).toString("hex");
};

const ACCESS_TOKEN_SECRET = generateTokenSecret();
const REFRESH_TOKEN_SECRET = generateTokenSecret();
process.env.ACCESS_TOKEN_SECRET = ACCESS_TOKEN_SECRET;
process.env.REFRESH_TOKEN_SECRET = REFRESH_TOKEN_SECRET;
async function connectToDatabase() {
    try {
        await mongoose.connect(process.env.BD_CONNECTION_STRING);
        console.log("Connected to MongoDB ....");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        process.exit();
    }
}

app.use("/api/signup", require("./src/routes/signup"));
app.use("/api/login", require("./src/routes/login"));
// app.use("/api/cambiorol", require("./src/routes/cambiorol"));
app.use("/api/signout", require("./src/routes/signout"));
app.use("/api/todos", authenticate, require("./src/routes/todos"));
app.use('/api/post',authenticate, require('./src/routes/posts'));
app.use('/api/reserva', authenticate, require('./src/routes/reservas'));
app.use('/api/refresh-token', require('./src/routes/refreshToken'));
app.use("/api/user", authenticate, require('./src/routes/user'));

connectToDatabase();

app.get("/", (req, res) => {
    res.send("Hello World");
});


const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});


console.log("hola mundo");