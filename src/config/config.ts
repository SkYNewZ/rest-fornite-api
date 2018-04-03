import { Client } from "pg";

const client = new Client({
  connectionString: process.env.DATABSE_CONNECTION_STING,
});
client.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log("Database connected");
  }
});

export const AppConfig = {
  debug: process.env.DEBUG || false,
  secret: process.env.SECRET || "g6ePcR'G36]l63n",
  static_uri: "/static",
};
