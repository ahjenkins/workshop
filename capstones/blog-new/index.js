import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

let id = 0;

app.get("/", (req, res) => {
    res.render("index.ejs");
})

app.post("/create", (req, res) => {
    // console.log(req.body);
    const { title, author, article } = req.body;
    id++;

    const post = {
        id: id,
        title,
        author,
        article
    }
    
    articles.push(post);
    console.log(articles);
    res.render("index.ejs", { articles });
})

app.get("/update", (req, res) => {
    // console.log(req.body);
    res.send("hello world");
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})

const articles = [];