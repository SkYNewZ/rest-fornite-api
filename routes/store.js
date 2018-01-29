var fortniteAPI = require('./auth');
var Store = require('../src/store');

function getStore(req, res) {
  var language = req.params.lang || 'en';
  fortniteAPI.login()
    .then(() => {
      fortniteAPI.getStore(language)
        .then((store) => {
          Store.convert(store, req.protocol + "://" + req.headers.host)
            .then((resultStore) => {
              res.json(resultStore);
            })
            .catch((err) => {
              /* istanbul ignore next */
              res.status(500).send({
                code: 500,
                message: err
              });
            });
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