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
  console.log("fetching " + req.params.equipmentType.toUpperCase());
  let response = await client.query(
    `SELECT * FROM equipment WHERE type LIKE '%${req.params.equipmentType.toUpperCase()}%'`
  );
  res.send(response.rows);
});

app.post("/addEquipment", (req, res) => {
  client.query(
    `INSERT INTO equipment(type,admin_number,equipment_status)
    VALUES
    ($1,$2,$3)`,
    [req.body.type, req.body.adminNumber, req.body.equipmentStatus]
  );
});

app.patch("/appendEquipment/:adminNumber", (req, res) => {
  client.query(
    `UPDATE equipment
    SET type = $1, equipment_status = $2
    WHERE admin_number = '${req.params.adminNumber}'`,
    [req.body.type, req.body.equipmentStatus]
  );
  res.send("success");
});

app.listen(3500, "127.0.0.10", () => {
  console.log("server Running on 3500");
});
