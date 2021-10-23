const Url = require('../models').urls;

const generateUrlKey = () => {
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

module.exports = {
  encodeUrl,
};
