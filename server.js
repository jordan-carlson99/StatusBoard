import express from "express";
const app = express();
import pg from "pg";
const { Client } = pg;
import dotenv from "dotenv";
dotenv.config();
import path from "path";
const serverPort = 3000 || process.env.port;
const pathToFile = path.resolve("./");

console.log(pathToFile);

const client = new Client({
  host: process.env.host || "localhost",
  port: process.env.db_port || 3000,
  database: process.env.database || "db",
  user: process.env.user || "username",
  password: process.env.password || "password",
});
// console.log(client);

client.connect();

app.get("/", (req, res) => {
  res.sendFile(path.join(pathToFile, "./index.html"));
});

app.get("/styles.css", (req, res) => {
  res.sendFile(path.join(pathToFile, "./styles.css"));
});

app.get("/app.js", (req, res) => {
  res.sendFile(path.join(pathToFile, "./app.js"));
});

app.listen(serverPort, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`server running on port ${serverPort}`);
  }
});
