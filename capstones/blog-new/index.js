import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

let id = 0;

app.get("/", (req, res) => {
    // console.log(req.body);
    res.render("index.ejs", { articles });
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
    // console.log("current articles:", articles);
    res.redirect("/");
})

app.get("/edit/:id", (req, res) => {
    const articleId = parseInt(req.params.id, 10);
    const article = articles.find(article => article.id === articleId);

    // console.log("edit articles: ", articles);
    // console.log("article test: ", article);
    
    if (article) {
        res.render("edit.ejs", { article });
    } else {
        res.status(404).send('Article not found');
    }
})

app.post("/update/:id", (req, res) => {
    const articleId = parseInt(req.params.id, 10);
    const { title, author, article } = req.body;
    
    const postIndex = articles.findIndex(a => a.id === articleId);

    if (postIndex !== -1) {
        articles[postIndex] = { id: articleId, title, author, article };
        res.redirect("/");
    }
    else {
        res.status(404).send('Article not found');
    }
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})

const articles = [];