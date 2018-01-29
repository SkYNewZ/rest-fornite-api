var fortniteAPI = require('../auth');

function getStatsBR(req, res) {
  var username = req.params.username;
  var platform = req.params.platform;
  fortniteAPI.login()
    .then(() => {
      fortniteAPI.getStatsBR(username, platform)
        .then((stats) => {
          res.json(stats);
        })
        .catch((err) => {
          if (err === "Player Not Found") {
            res.status(404).send({
              code: 404,
              message: err
            });
          } else /* istanbul ignore else  */ if (err === "Impossible to fetch User. User not found on this platform") {
            res.status(404).send({
              code: 404,
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

function getStatsBRFromID(req, res) {
  var id = req.params.id;
  var platform = req.params.platform;
  fortniteAPI.login()
    .then(() => {
      fortniteAPI.getStatsBRFromID(id, platform)
        .then((stats) => {
          res.json(stats);
        })
        .catch((err) => {
          if (err === "Impossible to fetch User. User not found on this platform") {
            res.status(404).send({
              code: 404,
              message: err
            });
          } else /* istanbul ignore else  */ if (err === "Impossible to fetch User.") {
            res.status(404).send({
              code: 404,
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

//export all the functions
module.exports = {
  getStatsBR,
  getStatsBRFromID
};
