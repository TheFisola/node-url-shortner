const urlService = require('../services/url.service');

const encodeUrl = async (req, res) => {
  const { urlKey } = await urlService.encodeUrl(req.body);
  res
    .status(201)
    .json({ status: true, message: 'Successful', data: { urlKey } });
};

const decodeUrl = async (req, res) => {
  if (!req.query.urlKey) {
    res
      .status(400)
      .json({ status: false, message: 'urlKey query parameter is required!' });
  }

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

const getUrlStats = async (req, res) => {
  const url = await urlService.getUrlStats(req.params.urlKey);

  if (!url) {
    res
      .status(404)
      .json({ status: false, message: 'Url with this key does not exist!' });
  }

  res.status(200).json({
    status: true,
    message: 'Successful',
    data: url,
  });
};

module.exports = {
  encodeUrl,
  decodeUrl,
  getUrlStats,
};
