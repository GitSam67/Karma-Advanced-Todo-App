const express = require("express");
const dotenv = require("dotenv");
const cookieparser = require("cookie-parser");
const mongoose = require("mongoose");
const userRouter = require("./routes/userRouter");
const todoRouter = require("./routes/todoRouter");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 8000;

dotenv.config({path:"./config.env"});
require("./database/connect");

app.use(cors({
    credentials: true,
    origin: ["https://karma-web.netlify.app"]
}));

app.set('trust proxy', 1);

app.use(express.json());
app.use(cookieparser());
app.use("/uploads", express.static('uploads'));

app.get("/", (req,res)=>{
    res.send("Hello server...");
});

app.use(userRouter);
app.use(todoRouter);

app.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`);
});