import { fortniteAPI } from '../tools/auth'
import { CustomError } from '../models/error'
import { Response, Request } from 'express'

export function getFortniteNews (req: Request, res: Response) {
  let language = req.params.lang || 'en'
  fortniteAPI.login()
    .then(() => {
      fortniteAPI.getFortniteNews(language)
        .then((news) => {
          res.json(news)
        })
        .catch((err) => {
          /* istanbul ignore next */
          res.status(500).send(new CustomError(500, err))
        })
    })
}
