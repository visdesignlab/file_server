import { Router } from "express";
import * as fs from 'fs';
import * as util from "util";
import * as path from "path";
import { parseToStoredMetadata, getMetadatafromStoredMetadata } from "../DataStructures/Metadata";

export function downloadRoute(router: Router) {
  router.get("/download/single/:filename", (req, res) => {
    res.download(`./uploads/${req.params.filename}`);
  });

  router.get("/download/list", (req,res)=>{
    let folder = "./uploads";
    let readDir = util.promisify(fs.readdir);
    let read = util.promisify(fs.readFile);
    readDir(folder).then(files => {
      let readPromises = files.filter(f => path.extname(f) === ".json").map(f => read(`${folder}/${f}`, 'utf-8'));
      Promise.all(readPromises).then(f => {
        res.json(f.map(_ => getMetadatafromStoredMetadata(parseToStoredMetadata(_))));
      })
    });
  });
}
