
const express = require("express");
require('dotenv').config();

const { Connectdb } = require('./models/db');

const cookieParser = require("cookie-parser");

const bodyParser = require("body-parser");
const cors = require('cors');
const router = require('./routes/auth');




const app = express();
app.use("/uploads", express.static("uploads"));
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
app.use(cors({
    origin: [
        
        "https://chitchat-1-5o49.onrender.com" 
    ],
}));



const Port = process.env.PORT

app.use("/user", router)


app.listen(Port, () => {
    Connectdb()
    console.log("succesfull run your is http://localhost:8000")
})


