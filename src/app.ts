import * as express from "express";
import { Router, Application } from "express-serve-static-core";
import { BuildRouter } from "./Routes/router";

function App(): Application {
  let app: Application = express();
  mountRoutes(app);
  return app;
}

function mountRoutes(app: Application) {
  app.use("/", BuildRouter());
}

export default App();
