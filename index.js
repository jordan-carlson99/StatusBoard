import express from "express";
import { resolve, join } from "path";
// import { equipmentList } from "./app.js";
import { equipmentList } from "./app.js";
const app = express();

const dir = resolve("./");

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

app.post("/hours", (req, res) => {
  res.end("recieved");
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
