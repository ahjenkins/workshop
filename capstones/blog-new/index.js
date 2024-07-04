import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs");
})

app.post("/create", (req, res) => {
    // console.log(req.body);
    const title = req.body.title;
    const author = req.body.author;
    const article = req.body.article;
    res.render("index.ejs");
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})