import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render(__dirname + "/views/index.ejs");
});

app.get("/create", (req, res) => {
    res.render("post-create.ejs");
});

app.get("/update", (req, res) => {
    res.send("update");
    // res.render("post-update.ejs");
});

app.get("/view", (req, res) => {
    res.send("view");
    // res.render("post-view.ejs");
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});