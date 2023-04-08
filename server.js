import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import path from "path";
import cors from "cors";
const frontEndServerPort = 3000 || process.env.port;
const pathToFile = path.resolve("./");

app.use(cors());

app.get("/", (req, res) => {
  res.sendFile(path.join(pathToFile, "./index.html"));
});

app.get("/styles.css", (req, res) => {
  res.sendFile(path.join(pathToFile, "./styles.css"));
});

app.get("/app.js", (req, res) => {
  res.sendFile(path.join(pathToFile, "./app.js"));
});

app.get("/update", async (req, res) => {
  res.sendFile(path.join(pathToFile, "./views/update.html"));
});

app.get("/scripts/update.js", (req, res) => {
  res.sendFile(path.join(pathToFile, "./scripts/update.js"));
});

app.listen(frontEndServerPort, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`server running on port ${frontEndServerPort}`);
  }
});
