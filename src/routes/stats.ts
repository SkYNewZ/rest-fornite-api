import { Request, Response } from "express";
import { CustomError } from "../models/error";
import { FortniteStats } from "../models/stats";
import { fortniteAPI } from "../tools/auth";

export function getStatsBR(req: Request, res: Response) {
  const username: string = req.params.username;
  const platform: string = req.params.platform;
  fortniteAPI.login().then(() => {
    fortniteAPI
      .getStatsBR(username, platform)
      .then((stats: FortniteStats) => {
        res.json(stats);
      })
      .catch((err) => {
        if (err === "Player Not Found") {
          res.status(404).send(new CustomError(404, err));
        } else if (
          err === "Impossible to fetch User. User not found on this platform"
        ) {
          res.status(404).send(new CustomError(404, err));
        } else if (err === "Please precise a good platform: ps4/xb1/pc") {
          res.status(400).send(new CustomError(400, err));
        } else {
          /* istanbul ignore next */
          res.status(500).send(new CustomError(500, err));
        }
      });
  });
}

export function getStatsBRFromID(req: Request, res: Response) {
  const id: number = req.params.id;
  const platform: number = req.params.platform;
  fortniteAPI.login().then(() => {
    fortniteAPI
      .getStatsBRFromID(id, platform)
      .then((stats: FortniteStats) => {
        res.json(stats);
      })
      .catch((err) => {
        if (
          err === "Impossible to fetch User. User not found on this platform"
        ) {
          res.status(404).send(new CustomError(404, err));
        } else if (err === "Please precise a good platform: ps4/xb1/pc") {
          res.status(400).send(new CustomError(400, err));
        } else {
          /* istanbul ignore next */
          res.status(500).send(new CustomError(500, err));
        }
      });
  });
}
