const express = require('express');
const validate = require('../../middlewares/validate');
const urlController = require('../../controllers/url.controller');
const urlValidation = require('../../validations/url.validation');

const router = express.Router();

router.post(
  '/encode',
  validate(urlValidation.encodeUrl),
  urlController.encodeUrl
);
router.get('/decode', urlController.decodeUrl);
router.get('/statistics/:urlKey', urlController.getUrlStats);

module.exports = router;
