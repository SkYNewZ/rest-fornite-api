import { Request, Response } from "express";
import { CustomError } from "../models/error";
import fortniteAPI from "../tools/auth";

/* istanbul ignore next */
export function getStatsPVE(req: Request, res: Response) {
  const username = req.params.username;
  fortniteAPI
    .getStatsPVE(username)
    .then((stats) => {
      res.json(stats);
    })
    .catch((err) => {
      if (err === "Player Not Found") {
        res.status(404).send(new CustomError(404, err));
      } else if (err === "No Data") {
          /* istanbul ignore next */ res
          .status(400)
          .send(new CustomError(400, err));
      } else {
        /* istanbul ignore next */
        res.status(500).send(new CustomError(500, err));
      }
    });
}

export function getFortnitePVEInfo(req: Request, res: Response) {
  const language = req.params.lang || "en";
  fortniteAPI
    .getFortnitePVEInfo(language)
    .then((store) => {
      res.json(store);
    })
    .catch((err) => {
      /* istanbul ignore next */
      res.status(500).send(new CustomError(500, err));
    });
}
