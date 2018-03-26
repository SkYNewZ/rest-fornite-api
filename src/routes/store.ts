const fortniteAPI = require('../tools/auth')
const Store = require('../tools/store')
const Config = require('../config/config')

function getStore (req, res) {
  let language = req.params.lang || 'en'
  fortniteAPI.login()
    .then(() => {
      fortniteAPI.getStore(language)
        .then((store) => {
          Store.convert(store, req.protocol + '://' + req.headers.host + Config.static_uri)
            .then((resultStore) => {
              res.json(resultStore)
            })
            .catch((err) => {
              /* istanbul ignore next */
              res.status(500).send({
                code: 500,
                message: err
              })
            })
        })
        .catch((err) => {
          /* istanbul ignore next */
          res.status(500).send({
            code: 500,
            message: err
          })
        })
    })
}

module.exports = {
  getStore
}
