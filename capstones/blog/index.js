import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

let today = new Date();
let formattedDate = today.toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' });
console.log(formattedDate);

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render(__dirname + "/views/index.ejs");
});

app.get("/create", (req, res) => {
    const data = {
        date: formattedDate
    };
    res.render("post-create.ejs", data);
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