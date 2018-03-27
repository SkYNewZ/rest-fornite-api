import { fortniteAPI } from '../tools/auth'
import { Tools } from '../tools/store'
import { AppConfig } from '../config/config'
import { CustomError } from '../class/error'
import { Response, Request } from 'express'

export function getStore(req: Request, res: Response) {
  let language: string = req.params.lang || 'en'
  fortniteAPI.login()
    .then(() => {
      fortniteAPI.getStore(language)
        .then((store) => {
          Tools.convertStore(store)
            .then((resultStore) => {
              res.json(resultStore)
            })
            .catch((err) => {
              /* istanbul ignore next */
              res.status(500).send(new CustomError(500, err))
            })
        })
        .catch((err) => {
          /* istanbul ignore next */
          res.status(500).send(new CustomError(500, err))
        })
    })
}
