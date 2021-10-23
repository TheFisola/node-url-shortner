const urlService = require('../services/url.service');

const encodeUrl = async (req, res) => {
  // TODO: Validate request
  const { urlKey } = await urlService.encodeUrl(req.body);
  res
    .status(201)
    .json({ status: true, message: 'Successful', data: { urlKey } });
};

const decodeUrl = async (req, res) => {
  // TODO: Validate request
  const url = await urlService.decodeUrl(req.query.urlKey);

  if (!url) {
    res
      .status(404)
      .json({ status: false, message: 'Url with this key does not exist!' });
  }

  res.status(200).json({
    status: true,
    message: 'Successful',
    data: { longUrl: url.longUrl },
  });
};

module.exports = {
  encodeUrl,
  decodeUrl
};
