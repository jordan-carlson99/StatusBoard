import express from "express";
const app = express();
import pg from "pg";
const { Client } = pg;
import dotenv from "dotenv";
dotenv.config();

const client = new Client({
  host: process.env.host || "localhost",
  port: process.env.db_port || 3000,
  database: process.env.database || "db",
  user: process.env.user || "username",
  password: process.env.password || "password",
});

client.connect();

app.get("/", (req, res) => {
  res.send("server running");
});

app.listen(3500, "127.0.0.10", () => {
  console.log("server Running on 3500");
});
