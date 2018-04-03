import * as bcrypt from "bcrypt";
import { Request, Response } from "express";
import { NextFunction } from "express-serve-static-core";
import { JsonWebTokenError, NotBeforeError, sign, TokenExpiredError, verify } from "jsonwebtoken";
import { Client, QueryResult } from "pg";
import { AppConfig } from "../config/config";

const client = new Client({
  connectionString: process.env.DATABSE_CONNECTION_STING,
});

export function getToken(req: Request, res: Response) {

  client.connect((err: Error) => {
    if (err) {
      return res.status(500).json({
        message: "Failed getting token",
        success: false,
      });
  }
  });

  client.query("SELECT * FROM users where email=$1::text", [req.body.email], (err: Error, result: QueryResult) => {
    /* istanbul ignore if */
    if (err) { throw err; }

    if (!result.rowCount || result.rowCount > 1) {
      return res
        .status(404)
        .json({
          message: "Authentication failed. User not found",
          success: false,
        });
    }

    const currentUser: any = result.rows[0];

    // check if password matches
    if (!bcrypt.compareSync(req.body.password, currentUser.password)) {
      return res
        .status(401)
        .json({
          message: "Authentication failed.",
          success: false,
        });
    }

    const payload = {
      email: currentUser.email,
    };

    const token = sign(payload, AppConfig.secret, {
      expiresIn: 7200,
    });

    /* istanbul ignore if */
    if (process.env.NODE_ENV !== "test") {
      console.log("[JWT] : " + req.body.email + " get a new token");
    }

    // return the information including token as JSON
    return res.json({
      access_token: token,
      expiresIn: 7200,
    });
  });
}

function getTokenFromHeader(req: Request): string | null {
  if ((req.headers.authorization as string) && (req.headers.authorization as string).split(" ")[0] === "Bearer") {
    return (req.headers.authorization as string).split(" ")[1];
  }
  return null;
}

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  if (req.path === "/oauth/token") {
    return next();
  }
  const token: string | null = getTokenFromHeader(req);

  if (!token) {
    return res.status(403).send({
      message: "No Bearer token provided.",
    });
  }

  verify(token, AppConfig.secret, (err: JsonWebTokenError | NotBeforeError | TokenExpiredError, decoded) => {
    if (err) {
      return res.status(403).json({
        message: "Failed to authenticate token.",
        reason: err.message,
      });
    } else {
      return next();
    }
  });

}
