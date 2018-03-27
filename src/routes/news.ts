import { fortniteAPI } from '../tools/auth'
import { CustomError } from '../models/error'
import { Response, Request } from 'express'
import { FortniteNews } from '../models/news';

export function getFortniteNews (req: Request, res: Response) {
  let language: string = req.params.lang || 'en'
  fortniteAPI.login()
    .then(() => {
      fortniteAPI.getFortniteNews(language)
        .then((news: FortniteNews) => {
          res.json(news)
        })
        .catch((err) => {
          /* istanbul ignore next */
          res.status(500).send(new CustomError(500, err))
        })
    })
}
