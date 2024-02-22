const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { authenticate, checkRole } = require("./src/middlewares/authenticate");
const crypto = require("crypto");
const helmet = require("helmet");
const morgan = require("morgan");
const jwt = require('jsonwebtoken'); 
const Token = require('./src/models/token');

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

process.env.ACCESS_TOKEN_SECRET = generateTokenSecret();
process.env.REFRESH_TOKEN_SECRET = generateTokenSecret();

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
app.use("/api/Login", require("./src/routes/login"));
app.use("api/cambiorol", require("./src/routes/cambiorol"))
app.use("/api/signout", require("./src/routes/signout"));
app.use("/api/todos", authenticate, require("./src/routes/todos"));
app.use('/api/post', require('./src/routes/posts'));
app.use('/api/reserva', require('./src/routes/reservas'));
app.use('/api/refresh-Token', require('./src/routes/refreshToken'))
// app.use('/api/post/new', require('./src/routes/posts'));

connectToDatabase();

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.post('/api/refresh-token', async (req, res) => {
    try {
        const { refreshToken } = req.body;
    
        if (!refreshToken) {
            return res.status(401).json({ error: 'Unauthorized - Refresh token not provided' });
        }

        const foundToken = await Token.findOne({ token: refreshToken });
    
        if (!foundToken) {
            return res.status(401).json({ error: 'Unauthorized - Refresh token not found' });
        }
    
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) {
            return res.status(401).json({ error: 'Unauthorized - Invalid refresh token' });
            }
    
        const accessToken = jwt.sign({ user: user }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
        res.json({ accessToken: accessToken });
      });
    } catch (error) {
      console.error('Error refreshing token:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});