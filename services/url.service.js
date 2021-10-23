const Url = require('../models').urls;

const generateUrlKey = () => {
  // TODO: Generate new key if key already exists
  return Math.random()
    .toString(36)
    .substr(2, 5)
    .split('')
    .map((c) => (Math.random() < 0.5 ? c.toUpperCase() : c))
    .join('');
};

const encodeUrl = async (encodeUrlRequest) => {
  encodeUrlRequest.urlKey = generateUrlKey();
  return Url.create(encodeUrlRequest);
};

const decodeUrl = async (urlKey) => {
  return Url.findOne({ where: { urlKey } });
};

module.exports = {
  encodeUrl,
  decodeUrl,
};
