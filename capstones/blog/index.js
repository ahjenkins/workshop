import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
import bodyParser from "body-parser";

const app = express();
const port = 3000;

let today = new Date();
let formattedDate = today.toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' });

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render(__dirname + "/views/index.ejs");
});

app.get("/create", (req, res) => {
    const data = {
        date: formattedDate
    };
    res.render("create.ejs", data);
});

app.get("/update", (req, res) => {
    res.send("update");
    // res.render("update.ejs");
});

app.get("/view", (req, res) => {
    // view a post
    res.send("view");
    // res.render("view-post.ejs");
});

app.post("/submit", (req, res) => {
    const postData = {
        title: req.body.title,
        author: req.body.author,
        content: req.body.content,
    };
    res.render("read.ejs", postData);
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});