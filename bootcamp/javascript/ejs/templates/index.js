import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render(__dirname + "/views/index.ejs");
});

app.post("/submit", (req, res) => {
  const first = req.body.fName;
  const last = req.body.lName;
  var length = first.length + last.length;
  res.render(__dirname + "/views/index.ejs", {
    length: length
  })
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
