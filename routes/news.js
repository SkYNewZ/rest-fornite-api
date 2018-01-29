var fortniteAPI = require('../auth');

function getFortniteNews(req, res) {
  var language = req.params.lang || 'en';
  fortniteAPI.login()
    .then(() => {
      fortniteAPI.getFortniteNews(language)
        .then((news) => {
          res.json(news);
        })
        .catch((err) => {
          /* istanbul ignore next */
          res.status(500).send({
            code: 500,
            message: err
          });
        });
    });
}

module.exports = {
  getFortniteNews
}
