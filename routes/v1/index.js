const express = require('express');
const router = express.Router();
const userController = require('../../controllers/url.controller');

router.post('/encode', userController.encodeUrl);
router.get('/decode', userController.decodeUrl);

module.exports = router;
