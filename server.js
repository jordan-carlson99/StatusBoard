import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import path from "path";
const frontEndServerPort = 3000 || process.env.port;
const pathToFile = path.resolve("./");

app.get("/", (req, res) => {
  res.sendFile(path.join(pathToFile, "./index.html"));
});

app.get("/styles.css", (req, res) => {
  res.sendFile(path.join(pathToFile, "./styles.css"));
});

app.get("/app.js", (req, res) => {
  res.sendFile(path.join(pathToFile, "./app.js"));
});

app.listen(frontEndServerPort, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`server running on port ${frontEndServerPort}`);
  }
});
