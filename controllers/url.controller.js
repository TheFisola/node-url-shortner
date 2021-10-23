const urlService = require('../services/url.service');

const encodeUrl = async (req, res) => {
  // TODO: Validate request
  const { urlKey, longUrl } = await urlService.encodeUrl(req.body);
  res
    .status(201)
    .json({ status: true, message: 'Successful', data: { urlKey, longUrl } });
};

module.exports = {
  encodeUrl,
};
