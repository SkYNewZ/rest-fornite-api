import { Request, Response } from "express";
import { AppConfig } from "../config/config";
import { CustomError } from "../models/error";
import { FortniteStore } from "../models/store";
import fortniteAPI from "../tools/auth";
import { Tools } from "../tools/store";

export function getStore(req: Request, res: Response) {
  const language: string = req.params.lang || "en";
  fortniteAPI
    .getStore(language)
    .then((store: Promise<any>) => {
      Tools.convertStore(store)
        .then((resultStore: FortniteStore) => {
          res.json(resultStore);
        })
        .catch((err) => {
          /* istanbul ignore next */
          res.status(500).send(new CustomError(500, err));
        });
    })
    .catch((err) => {
      /* istanbul ignore next */
      res.status(500).send(new CustomError(500, err));
    });
}
