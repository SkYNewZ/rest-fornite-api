let fortniteAPI = require('./auth');

function getStatsBR(req, res) {
    let username = req.params.username;
    let platform = req.params.platform;
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
                    } else if (err === "Impossible to fetch User. User not found on this platform") {
                        res.status(404).send({
                            code: 404,
                            message: err
                        });
                    } else /* istanbul ignore else  */
                    if (err === "Please precise a good platform: ps4/xb1/pc") {
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

function getStatsBRFromID(req, res) {
    let id = req.params.id;
    let platform = req.params.platform;
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
                    } else /* istanbul ignore else  */ if (err === "Please precise a good platform: ps4/xb1/pc") {
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

//export all the functions
module.exports = {
    getStatsBR,
    getStatsBRFromID
};
