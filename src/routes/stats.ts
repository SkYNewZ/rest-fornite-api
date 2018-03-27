import { fortniteAPI } from '../tools/auth'
import { CustomError } from '../models/error'
import { Response, Request } from 'express'
import { FortniteStats } from '../models/stats';

export function getStatsBR(req: Request, res: Response) {
  let username: string = req.params.username
  let platform: string = req.params.platform
  fortniteAPI.login()
    .then(() => {
      fortniteAPI.getStatsBR(username, platform)
        .then((stats: FortniteStats) => {
          res.json(stats)
        })
        .catch((err) => {
          if (err === 'Player Not Found') {
            res.status(404).send(new CustomError(404, err))
          } else if (err === 'Impossible to fetch User. User not found on this platform') {
            res.status(404).send(new CustomError(404, err))
          } else
            /* istanbul ignore else  */
            if (err === 'Please precise a good platform: ps4/xb1/pc') {
              res.status(400).send(new CustomError(400, err))
            } else {
              res.status(500).send(new CustomError(500, err))
            }
        })
    })
}

export function getStatsBRFromID(req: Request, res: Response) {
  let id: number = req.params.id
  let platform: number = req.params.platform
  fortniteAPI.login()
    .then(() => {
      fortniteAPI.getStatsBRFromID(id, platform)
        .then((stats: FortniteStats) => {
          res.json(stats)
        })
        .catch((err) => {
          if (err === 'Impossible to fetch User. User not found on this platform') {
            res.status(404).send(new CustomError(404, err))
          } else
            /* istanbul ignore else  */
            if (err === 'Please precise a good platform: ps4/xb1/pc') {
              res.status(400).send(new CustomError(400, err))
            } else {
              res.status(500).send(new CustomError(500, err))
            }
        })
    })
}
