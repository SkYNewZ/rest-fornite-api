var fortniteAPI = require('../auth');

function getStatsPVE(req, res) {
  var username = req.params.username;
  fortniteAPI.login()
    .then(() => {
      fortniteAPI.getStatsPVE(username)
        .then((stats) => {
          res.json(stats);
        })
        .catch((err) => {
          if (err === "Player Not Found") {
            res.status(404).send({
              code: 404,
              message: err
            });
          } else if (err === "No Data") {
            res.status(400).send({
              code: 400,
              message: err
            });
          } else {
            res.status(500).send({
              code: 500,
              message: err
            });
          }
        });
    });
}

function getFortnitePVEInfo(req, res) {
  var language = req.params.lang || 'en';
  fortniteAPI.login()
    .then(() => {
      fortniteAPI.getFortnitePVEInfo(language)
        .then((store) => {
          res.json(store);
        })
        .catch((err) => {
          res.status(500).send({
            code: 500,
            message: err
          });
        });
    });
}

//export all the functions
module.exports = {
  getStatsPVE,
  getFortnitePVEInfo
};