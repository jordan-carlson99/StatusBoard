const express = require("express");
const path = require("path");
const app = express();

const dir = path.resolve("./");

app.get("/", (req, res) => {
  res.sendFile(path.join(dir, "/index.html"), (err) => {
    if (err) {
      res.status(500);
      return res.end(`Server Error ${err}`);
    }
    console.log("sent!");
  });
});

app.get("/styles.css", (req, res) => {
  res.sendFile(path.join(dir, "/styles.css"), (err) => {
    if (err) {
      res.status(500);
      return res.end(`Server Error ${err}`);
    }
  });
});

app.get("/app.js", (req, res) => {
  res.sendFile(path.join(dir, "/app.js"), (err) => {
    if (err) {
      res.status(500);
      return res.end(`Server Error ${err}`);
    }
  });
});

app.get("/addhours", (req, res) => {
  res.sendFile(path.join(dir, "/views/addHours.html"), (err) => {
    if (err) {
      res.status(500);
      return res.end(`Server Error ${err}`);
    }
  });
});

app.get("/app.js", (req, res) => {
  res.sendFile(path.join(dir, "/app.js"), (err) => {
    if (err) {
      res.status(500);
      return res.end(`Server Error ${err}`);
    }
  });
});

app.get("/app.js", (req, res) => {
  res.sendFile(path.join(dir, "/app.js"), (err) => {
    if (err) {
      res.status(500);
      return res.end(`Server Error ${err}`);
    }
  });
});

app.listen(3000, () => {
  console.log("server running");
});
