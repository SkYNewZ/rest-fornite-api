var fortniteAPI = require('../auth');

function checkPlayer(req, res) {
  var username = req.params.username;
  var platform = req.params.platform;
  fortniteAPI.login()
    .then(() => {
      fortniteAPI.checkPlayer(username, platform)
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

//export all the functions
module.exports = {
  checkPlayer
};
