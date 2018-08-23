import { Router } from "express-serve-static-core";
import * as multer from "multer";
import * as path from "path";
import * as fs from "fs";

export function uploadRoute(router: Router) {
  if (!fs.existsSync("./uploads")) {
    fs.mkdirSync("./uploads");
  }

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

  router.post("/upload/single", upload.single("file"), (req, res) => {
    let jsonFileName = `${path.basename(req.file.filename, ".pdf")}.json`;
    let metadata = JSON.parse(req.body.metadata);

    fs.writeFile(
      `./uploads/${jsonFileName}`,
      JSON.stringify(metadata),
      "utf8",
      err => {
        if (err) throw err;
      }
    );

    res.json({
      message: jsonFileName
    });
  });
}
