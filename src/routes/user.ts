import { Request, Response } from "express";
import { CustomError } from "../models/error";
import { FortniteUser } from "../models/user";
import { fortniteAPI } from "../tools/auth";

export function checkPlayer(req: Request, res: Response) {
  const username: string = req.params.username;
  const platform: string = req.params.platform;
  fortniteAPI.login().then(() => {
    fortniteAPI
      .checkPlayer(username, platform)
      .then((r: FortniteUser) => {
        r.$platform = platform;
        res.json(r);
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
