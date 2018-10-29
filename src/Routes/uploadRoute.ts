import { Metadata, ParseMetadata } from './../DataStructures/Metadata';
import { DatasetInfo, isValidDatasetInfo, parseToDatasetInfo } from './../DataStructures/DatasetInfo';
import { Router } from "express-serve-static-core";
import * as multer from "multer";
import * as path from "path";
import * as fs from "fs";
import * as express from 'express';

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
    let jsonFileName = `${path.basename(req.file.filename, path.extname(req.file.filename))}.json`;
    let datasetinfo: DatasetInfo = JSON.parse(req.body.metadata);
    if (!isValidDatasetInfo(datasetinfo)){
      fs.unlink(`./uploads/${req.file.filename}`, (err)=>{
      });
      res.status(400).json(datasetinfo);
      return;
    }

    datasetinfo.file = `${req.file.filename}`;
    let metadata: Metadata = ParseMetadata(req.file, datasetinfo);

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


