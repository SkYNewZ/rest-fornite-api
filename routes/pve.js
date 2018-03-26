const fortniteAPI = require('./auth')

function getStatsPVE (req, res) {
  let username = req.params.username
  fortniteAPI.login()
    .then(() => {
      fortniteAPI.getStatsPVE(username)
        .then((stats) => {
          res.json(stats)
        })
        .catch((err) => {
          if (err === 'Player Not Found') {
            res.status(404).send({
              code: 404,
              message: err
            })
          } /* istanbul ignore next */ else if (err === 'No Data') {
            res.status(400).send({
              code: 400,
              message: err
            })
          } else {
            /* istanbul ignore next */
            res.status(500).send({
              code: 500,
              message: err
            })
          }
        })
    })
}

function getFortnitePVEInfo (req, res) {
  let language = req.params.lang || 'en'
  fortniteAPI.login()
    .then(() => {
      fortniteAPI.getFortnitePVEInfo(language)
        .then((store) => {
          res.json(store)
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

// export all the functions
module.exports = {
  getStatsPVE,
  getFortnitePVEInfo
}
