import { Router } from "express-serve-static-core";
import * as multer from "multer";
import * as path from "path";

export function uploadRoute(router: Router) {
  let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads");
    },
    filename: (req, file, cb) => {
      cb(
        null,
        `${path.parse(file.originalname).name}_${Date.now()}${path.extname(
          file.originalname
        )}`
      );
    }
  });

  let upload = multer({
    storage: storage,
    limits: {
      fileSize: 5120000
    }
  });

  router.post("/upload", upload.single("file"), (req, res) => {
    res.json({
      message: "File Uploaded"
    });
  });

  router.get("/upload", (req, res) => {
    console.log("Update");
  });
}
