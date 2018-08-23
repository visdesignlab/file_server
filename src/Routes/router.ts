import { Router } from "express";
import { uploadRoute } from "./uploadRoute";
import { downloadRoute } from "./downloadRouter";

export function BuildRouter() {
  let router = Router();
  uploadRoute(router);
  downloadRoute(router);
  return router;
}
