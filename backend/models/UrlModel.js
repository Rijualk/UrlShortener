const mongoose= require("mongoose")
const urlSchema = new mongoose.Schema({
    originalUrl: {
      type: String,
      required :true
    },
    shortUrl: {
      type: String,
      unique:true
    },
    clicks: {
      type: Number,
      default:0
    },
    createAt:{
        type:Date,
        default:Date.now
    }
  });
  
  const urlCollection = mongoose.model("urls", urlSchema);
  
  module.exports = urlCollection;
  