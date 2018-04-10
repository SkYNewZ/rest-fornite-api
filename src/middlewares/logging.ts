/* istanbul ignore file */

import { QueryResult } from "pg";
import { AppConfig, DatabaseClient } from "../config/config";
import { IJwtPayload } from "../interfaces/jwt-payload.interface";

export function ApiLogger(
  token: IJwtPayload,
  message: string = null,
  parameters: string = null,
  userAgent: string = null,
) {
  const userEmail = token.email;
  DatabaseClient.query(
    "INSERT INTO logs(message, user_mail, parameters, user_agent) VALUES($1, $2, $3, $4)",
    [message, userEmail, parameters, userAgent],
    (err: Error, result: QueryResult) => {
      /* istanbul ignore if */
      if (err) {
        throw err;
      }
    },
  );
}
