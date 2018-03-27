import { fortniteAPI } from '../tools/auth'
import { CustomError } from '../models/error'
import { Response, Request } from 'express'

export function getStatsPVE (req: Request, res: Response) {
  let username = req.params.username
  fortniteAPI.login()
    .then(() => {
      fortniteAPI.getStatsPVE(username)
        .then((stats) => {
          res.json(stats)
        })
        .catch((err) => {
          if (err === 'Player Not Found') {
            res.status(404).send(new CustomError(404, err))
          } /* istanbul ignore next */ else if (err === 'No Data') {
            res.status(400).send(new CustomError(400, err))
          } else {
            /* istanbul ignore next */
            res.status(500).send(new CustomError(500, err))
          }
        })
    })
}

export function getFortnitePVEInfo (req: Request, res: Response) {
  let language = req.params.lang || 'en'
  fortniteAPI.login()
    .then(() => {
      fortniteAPI.getFortnitePVEInfo(language)
        .then((store) => {
          res.json(store)
        })
        .catch((err) => {
          /* istanbul ignore next */
          res.status(500).send(new CustomError(500, err))
        })
    })
}
