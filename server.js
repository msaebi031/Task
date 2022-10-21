// server.js
const next = require("next");
const express = require("express");
const multer = require("multer");
require("dotenv").config();
const server = express();

// ========= Next Js ========== //
const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
const app = next({ dev, hostname, port });

const handle = app.getRequestHandler();

// ========= DataBase ========== //
require("./server/utils/database");
const { CreateUser } = require("./server/controllers/user");

// ========= Multer ========== //
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

var upload = multer({ storage: storage });

// ========= Route ========== //
app.prepare().then(async () => {
  server.post("/upload", upload.array("media"), CreateUser);

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
