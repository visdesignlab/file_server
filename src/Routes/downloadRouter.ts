import { Router } from "express";

export function downloadRoute(router: Router) {
  router.get("/download/single/:filename", (req, res) => {
    res.download(`./uploads/${req.params.filename}`);
  });
}
