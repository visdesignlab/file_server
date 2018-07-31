import { Router } from "express";

export function BuildRouter() {
  let router = Router();
  router.get("/", (req, res) => {
    res.json({
      message: "Hello, World!"
    });
  });
  return router;
}
