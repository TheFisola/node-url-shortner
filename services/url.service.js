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

const updateVisitCount = async (url) => {
  console.log('URL: ', url);
  const { visitCount, urlKey } = url;
  await Url.update(
    { visitCount: visitCount + 1 },
    {
      where: {
        urlKey,
      },
    }
  );
};

const encodeUrl = async (encodeUrlRequest) => {
  encodeUrlRequest.urlKey = generateUrlKey();
  return Url.create(encodeUrlRequest);
};

const decodeUrl = async (urlKey) => {
  const url = await Url.findOne({ where: { urlKey } });
  if (url) {
    await updateVisitCount(url);
  }
  return url;
};

module.exports = {
  encodeUrl,
  decodeUrl,
};
