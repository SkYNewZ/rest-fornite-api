import { fortniteAPI } from '../tools/auth'
import { Response, Request } from 'express'
import { CustomError } from '../class/error'

export function checkFortniteStatus(req: Request, res: Response) {
  fortniteAPI.login()
    .then(() => {
      fortniteAPI.checkFortniteStatus()
        .then((fortniteStatus) => {
          res.json({
            status: fortniteStatus
          })
        })
        .catch((err: any) => {
          /* istanbul ignore next */
          res.status(500).send(new CustomError(500, err))
        })
    })
}
