var fortniteAPI = require('../auth');

function getStore(req, res) {
  var language = req.params.lang || 'en';
  fortniteAPI.login()
    .then(() => {
      fortniteAPI.getStore(language)
        .then((store) => {
          res.json(store);
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
  getStore
}
