import express from "express";
import { resolve, join } from "path";
import bodyParser from "body-parser";
// import { equipmentList } from "./app.js";
const app = express();

const dir = resolve("./");

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(join(dir, "/index.html"), (err) => {
    if (err) {
      res.status(500);
      return res.end(`Server Error ${err}`);
    }
    console.log("sent!");
  });
});

app.get("/styles.css", (req, res) => {
  res.sendFile(join(dir, "/styles.css"), (err) => {
    if (err) {
      res.status(500);
      return res.end(`Server Error ${err}`);
    }
  });
});

app.get("/app.js", (req, res) => {
  res.sendFile(join(dir, "/app.js"), (err) => {
    if (err) {
      res.status(500);
      return res.end(`Server Error ${err}`);
    }
  });
});

// app.get("/addhours", (req, res) => {
//   res.sendFile(path.join(dir, "/views/addHours.html"), (err) => {
//     if (err) {
//       res.status(500);
//       return res.end(`Server Error ${err}`);
//     }
//   });
// });

app.post("/update", (req, res) => {
  // equipment list is empty, we need to either read from txt file or find a way to update
  console.log(equipmentList);
  // this entire thing needs to be put in app.js and imported then called
  for (let i = 0; i < equipmentList.length; i++) {
    console.log(i);
    if (
      req.body.type == equipmentList[i].type &&
      req.body.adminNumber == equipmentList[i].adminNumber
    ) {
      for (let j = 0; j < Object.keys(equipmentList[i]).length; j++) {
        console.log(equipmentList[i][Object.keys(equipmentList[i])[j]]);
      }
      console.log(equipmentList[i]);
      equipmentList[i].type = req.body.type;
      equipmentList[i].adminNumber = req.body.adminNumber;
      console.log(equipmentList[i]);
    }
  }
  res.end(req.body.adminNumber);
});

app.post("/create", (req, res) => {
  console.log(req.body);
  res.end("complete");
});

app.get("/test.js", (req, res) => {
  res.sendFile(join(dir, "/test.js"), (err) => {
    if (err) {
      res.status(500);
      return res.end(`Server Error ${err}`);
    }
  });
});

app.listen(3000, () => {
  console.log("server running");
});
