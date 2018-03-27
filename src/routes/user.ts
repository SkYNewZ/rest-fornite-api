import { fortniteAPI } from '../tools/auth'
import { CustomError } from '../models/error'
import { Response, Request } from 'express'

export function checkPlayer(req: Request, res: Response) {
  const username: string = req.params.username
  const platform: string = req.params.platform
  fortniteAPI.login()
    .then(() => {
      fortniteAPI.checkPlayer(username, platform)
        .then((stats) => {
          res.json(stats)
        })
        .catch((err) => {
          if (err === 'Player Not Found') {
            res.status(404).send(new CustomError(404, err))
          } else if (err === 'Impossible to fetch User. User not found on this platform') {
            res.status(404).send(new CustomError(404, err))
          } else /* istanbul ignore else  */ if (err === 'Please precise a good platform: ps4/xb1/pc') {
            res.status(400).send(new CustomError(400, err))
          } else {
            res.status(500).send(new CustomError(50040, err))
          }
        })
    })
}
