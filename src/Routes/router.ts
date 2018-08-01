import { Router } from "express";
import { uploadRoute } from "./uploadRoute";

export function BuildRouter() {
  let router = Router();
  uploadRoute(router);
  return router;
}
