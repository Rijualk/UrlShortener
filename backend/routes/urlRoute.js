const express = require('express');
const {urlShorten,redirectToOriginalUrl} = require('../controllers/urlController');

const router = express.Router();

router.get("/:shortUrl", redirectToOriginalUrl);
router.post('/url',urlShorten);
module.exports=router;