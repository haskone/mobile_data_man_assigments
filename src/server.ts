import express from "express";

import config from "./config";
import { DB } from "./db";

const app = express();
app.set("port", config.port);

const db = new DB();

// TODO: some dummy API for DB?
// ... and work with promises here
app.get("/", (req, res) => {
  res.send({ select_all: [] });
});

const server = app.listen(app.get("port"), () => {
  console.log("App is running at http://localhost:%d", app.get("port"));
  console.log("Press CTRL-C to stop\n");
});

export default server;
