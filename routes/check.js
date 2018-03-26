const fortniteAPI = require('./auth')

function checkFortniteStatus (req, res) {
  fortniteAPI.login()
    .then(() => {
      fortniteAPI.checkFortniteStatus()
        .then((status) => {
          res.json({
            status: status
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
  checkFortniteStatus
}
