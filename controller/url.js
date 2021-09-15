const Url = require('../model/url');
const { nanoid } = require('nanoid');

module.exports.shortURL = async (req, res) => {
  const url = req.body.url;
  if (!url) {
    res.status(402).json({ status: 'error', message: 'url not found!' });
  }

  // prevent url duplication
  // const oldUrl = await Url.findOne({ url: url });
  // if (oldUrl) {
  //   return res.status(200).json({
  //     status: 'sucess',
  //     data: { url: `http://${req.get('host')}/${oldUrl.slug}` },
  //   });
  // }

  let urlId = nanoid(8);
  while (await Url.findOne({ slug: urlId })) {
    urlId = nanoid(8);
  }

  try {
    const item = await Url.create({
      slug: urlId,
      url: url,
    });
    res.status(200).json({
      status: 'success',
      url: `http://${req.get('host')}/${urlId}`,
    });
  } catch (e) {
    res.status(400).json({
      status: 'error',
      message: 'something went wrong!',
    });
  }
};

module.exports.validate = async (req, res) => {
  const id = req.params.id;

  const url = await Url.findOne({ slug: id });
  if (url) {
    await Url.findOneAndUpdate({ slug: id }, { $inc: { views: 1 } });
    res.redirect(url.url);
  } else {
    res.status(404).send('URL not found!');
  }
};
