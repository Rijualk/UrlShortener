const urlCollection = require("../models/UrlModel");
const generateShortUrl = require("../utils/generateUrl");

const urlShorten=async(req,res)=>{
    try{
        const {originalUrl}=req.body;
        
        // if url is not found
        if(!originalUrl){
            return res.status(400).json({message:"url is required"});
        }

        // check the url is already present
        let url = await urlCollection.findOne({originalUrl});
        if(url){
            return res.json(url);
        }

        // create a shorten url
        const shortUrl = generateShortUrl();
        url = await new urlCollection({
            originalUrl,shortUrl
        })
        await url.save();
        return res.json(url);

    }
    catch(err){
        res.status(500).json({message:"Server Error "+err.message});
    }
}


const redirectToOriginalUrl=async(req,res)=>{
   try{
    const {shortUrl}=req.params;
    let url =await urlCollection.findOne({shortUrl:shortUrl});
    if(!url){
        return res.status(404).json("Url not found");
    }
    url.clicks += 1;
    await url.save();
    res.redirect(url.originalUrl);
   }
   catch(err){
    res.status(500).json({message:"Some error occured while redirecting"});
   }
}
module.exports= {urlShorten,redirectToOriginalUrl};