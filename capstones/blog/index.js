import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
import bodyParser from "body-parser";

const app = express();
const port = 3000;

function dateToday () {
    let today = new Date();
    let formattedDate = today.toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' });
    return formattedDate;
};

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    const data = {
        title: articleTitles,
        author: authors,
        content: contents
        // imgThumbnail: imgThumbnails
    };
    res.render(__dirname + "/views/index.ejs", data);
});

app.get("/create", (req, res) => {
    const data = {
        date: dateToday()
    };
    res.render("create.ejs", data);
});

app.get("/edit", (req, res) => {
    res.send("edit");
    // res.render("edit.ejs");
});

app.get("/view", (req, res) => {
    // view a post
    // generate a new .ejs file after a post is created?
    console.log(req.body);
    res.send("view");
    // res.render("view-post.ejs");
});

app.post("/submit", (req, res) => {
    let title = req.body.title;
    let author = req.body.author;
    let content = req.body.content;
    articleTitles.push(title);
    authors.push(author);
    contents.push(content);

    const postData = {
        id: posts.length + 1,
        title: title,
        author: author,
        content: content,
    };
    
    posts.push(postData);
    res.render("read.ejs", postData);
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

const articleTitles = []
const authors = []
const contents = []

// const imgThumbnails = [
//     "images/fitness1.jpg"
// ]