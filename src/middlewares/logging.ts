/* istanbul ignore file */

import { QueryResult } from "pg";
import { AppConfig, DatabaseClient } from "../config/config";
import { IJwtPayload } from "../interfaces/jwt-payload.interface";

export function ApiLogger(
  token: IJwtPayload,
  message: string = null,
  parameters: object = null,
  userAgent: string = null,
) {
  DatabaseClient.query(
    "INSERT INTO logs(id, message, created_at, user_id, parameters, user_agent) VALUES(nextval('logs_id_seq'), $1, $2, $3, $4, $5)",
    [message, new Date(), token.user_id, parameters, userAgent],
    (err: Error, result: QueryResult) => {
      /* istanbul ignore if */
      if (err) {
        throw err;
      }
    },
  );
}
