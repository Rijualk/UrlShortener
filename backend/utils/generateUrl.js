const crypto= require('crypto');
function generateShortUrl() {
     return crypto.randomBytes(8).toString("hex");
 }
 
module.exports= generateShortUrl;