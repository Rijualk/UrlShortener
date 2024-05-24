const express = require('express');
const connectDb = require('./db');
const urlRoute=require("./routes/urlRoute");
const bodyParser = require('body-parser');
const dotenv = require("dotenv").config();
const app = express();

connectDb();
app.use(bodyParser.json())
app.use("/",urlRoute);
app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})
