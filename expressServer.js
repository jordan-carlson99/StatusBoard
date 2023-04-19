import express from "express";
const app = express();
import pg from "pg";
const { Client } = pg;
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";

const client = new Client({
  host: process.env.host || "localhost",
  port: process.env.db_port || 3000,
  database: process.env.database || "db",
  user: process.env.user || "username",
  password: process.env.password || "password",
});

client.connect();

app.use(express.json());

app.use(cors());

app.get("/:equipmentType", async (req, res) => {
  let response;
  console.log("fetching " + req.params.equipmentType.toUpperCase());
  if (req.params.equipmentType == "all") {
    response = await client.query(`SELECT * FROM equipment`);
  } else {
    response = await client.query(
      `SELECT * FROM equipment WHERE type LIKE '%${req.params.equipmentType.toUpperCase()}%'`
    );
  }
  res.send(response.rows);
});

app.get("/id/:id", async (req, res) => {
  let response = await client.query(
    `SELECT * FROM equipment WHERE equipment_id=$1`,
    [req.params.id]
  );
  res.send(response.rows[0]);
});

app.post("/addEquipment", (req, res) => {
  client.query(
    `INSERT INTO equipment(type,admin_number,equipment_status)
    VALUES
    ($1,$2,$3)`,
    [req.body.type, req.body.adminNumber, req.body.equipmentStatus]
  );
});

app.patch("/appendEquipment", (req, res) => {
  // console.log(req.body);
  let keys = Object.keys(req.body);
  console.log(keys);
  keys.forEach((key) => {
    if (
      req.body[key] == null &&
      (key == "equipment_id" ||
        key == "admin_number" ||
        key == "type" ||
        key == "equipment_status")
    ) {
      // do nothing
    } else if (req.body[key] == null) {
      console.log(key);
      console.log("null it");
      client.query(
        `UPDATE equipment SET ${key} = NULL WHERE admin_number = CAST(${req.body.admin_number} AS varchar(255))`
      );
    } else {
      client.query(`UPDATE equipment SET ${key} = '${req.body[key]}'
      WHERE admin_number = CAST(${req.body.admin_number} AS varchar(255))`);
    }
  });
  res.send("success");
});

app.listen(3500, "127.0.0.10", () => {
  console.log("server Running on 3500");
});
