const Url = require('../models').urls;

const generateUrlKey = () => {
  return Math.random()
    .toString(36)
    .substr(2, 5)
    .split('')
    .map((c) => (Math.random() < 0.5 ? c.toUpperCase() : c))
    .join('');
};

const updateVisitCount = async (url) => {
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
  let urlKey;
  let url;
  // Generate key that does not already exist
  do {
    urlKey = generateUrlKey();
    url = await Url.findOne({ where: { urlKey } });
  } while (url);

  encodeUrlRequest.urlKey = urlKey;
  return Url.create(encodeUrlRequest);
};

const decodeUrl = async (urlKey) => {
  const url = await Url.findOne({ where: { urlKey } });
  if (url) {
    await updateVisitCount(url);
  }
  return url;
};

const getUrlStats = async (urlKey) => {
  return Url.findOne({ where: { urlKey } });
};

module.exports = {
  encodeUrl,
  decodeUrl,
  getUrlStats,
};
