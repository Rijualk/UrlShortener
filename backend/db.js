const mongoose = require("mongoose");

const connectDb=()=>{
    mongoose.connect(process.env.MONGO_URI+"/urlShortener")
      .then(() => {
        console.log("mongodb connected");
      })
      .catch(() => {
        console.log("connection failed");
      });
}

module.exports= connectDb;