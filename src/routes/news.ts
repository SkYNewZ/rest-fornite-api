import { Request, Response } from "express";
import { CustomError } from "../models/error";
import { FortniteNews } from "../models/news";
import fortniteAPI from "../tools/auth";

export function getFortniteNews(req: Request, res: Response) {
  const language: string = req.params.lang || "en";
  fortniteAPI
    .getFortniteNews(language)
    .then((news: FortniteNews) => {
      res.json(news);
    })
    .catch((err) => {
      /* istanbul ignore next */
      res.status(500).send(new CustomError(500, err));
    });
}
