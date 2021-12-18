import express from "express";
import multer from "multer";
import sizeOf from "image-size";
import sharp from "sharp";
import fs from "fs";
import axios from "axios";
import crypto from "crypto";

const app = express();

const img = multer({
  dest: "./img",
});

app
  .use(express.urlencoded({ extended: true }))
  .set("view engine", "ejs")
  .set("views", "views")
  .get("/", (r) => r.res.render("./index"))
  .post("/size2json", img.single("image"), async (r) => {
    const tempPath = r.file.path;
    sizeOf(tempPath, function (err, dimensions) {
      r.res.send({
        width: dimensions.width,
        height: dimensions.height,
      });
    });
  })
  .get("/makeimage?", (r) => {
    const width = parseInt(r.query.width);
    const height = parseInt(r.query.height);
    sharp("./img/photo-recommendation.png")
      .resize(width, height)
      .toFile("./img/photo-recommendation.png", (err, info) => {
        r.res.download("./img/output.png");
      });
  })
  .all("/log", (r) => {
    console.log(r.params.data);
    console.log(r.headers);
  })
  .get("/sha1", (r) => {
    r.res.render("./sha", { value: "" });
  })
  
  .all("/login", (r) => r.res.send("deadtrace"))
  .listen(process.env.PORT || 3000, () => {
    console.log("Server is working");
  });
