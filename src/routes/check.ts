import { Request, Response } from "express";
import { CustomError } from "../models/error";
import fortniteAPI from "../tools/auth";

export function checkFortniteStatus(req: Request, res: Response) {
  fortniteAPI
    .checkFortniteStatus()
    .then((fortniteStatus) => {
      res.json({
        status: fortniteStatus,
      });
    })
    .catch((err: any) => {
      if (err === "Impossible to fetch fortnite data") {
        res.status(404).send(new CustomError(404, err));
      } else {
        /* istanbul ignore next */
        res.status(500).send(new CustomError(500, err));
      }
    });
}
