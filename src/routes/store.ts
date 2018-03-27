import { fortniteAPI } from '../tools/auth'
import { Store } from '../tools/store'
import { AppConfig } from '../config/config'

export function getStore(req, res) {
  let language = req.params.lang || 'en'
  fortniteAPI.login()
    .then(() => {
      fortniteAPI.getStore(language)
        .then((store) => {
          Store.convert(store, req.protocol + '://' + req.headers.host + AppConfig.static_uri)
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
