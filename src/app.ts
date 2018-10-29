import * as express from "express";
import { Router, Application } from "express-serve-static-core";
import { BuildRouter } from "./Routes/router";
import bodyParser = require("body-parser");
import cors = require('cors');

function App(): Application {
  let app: Application = express();
  mountRoutes(app);
  return app;
}

function mountRoutes(app: Application) {
  app.use(cors());
  app.use(bodyParser.text({ type: 'text/html' }))
  app.use("/", BuildRouter());
}

export default App();
