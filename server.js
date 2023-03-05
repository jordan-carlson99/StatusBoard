const { readFileSync, writeFileSync } = require("fs");

const express = require("express");

const app = express();

app.set("view engine", "ejs");

app.use(express.static("./"));
app.get("/", (request, response) => {
  const myFile = readFileSync("./equipmentList.txt", "utf-8");
  console.log(`my files says : ${myFile}`);
  response.render("index");
});

// setInterval(() => {
//   //do
//   writeFileSync("./equipmentList.txt", equipList);
// }, 6000);

app.listen(5000, () => console.log("listening on port 5,000"));
