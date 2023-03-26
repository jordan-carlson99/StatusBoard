const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.end("test");
});

app.listen(3000, () => {
  console.log("server running");
});
