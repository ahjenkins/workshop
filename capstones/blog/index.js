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
        imgThumbnail: imgThumbnails
    };
    res.render(__dirname + "/views/index.ejs", data);
});

app.get("/create", (req, res) => {
    const data = {
        date: dateToday()
    };
    res.render("create.ejs", data);
});

app.get("/update", (req, res) => {
    res.send("update");
    // res.render("update.ejs");
});

app.get("/view", (req, res) => {
    // view a post
    // generate a new .ejs file after a post is created?
    res.send("view");
    // res.render("view-post.ejs");
});

app.post("/submit", (req, res) => {
    let title = req.body.title;
    let author = req.body.author;
    let content = req.body.content;
    // articleTitles.push(title);

    const postData = {
        title: title,
        author: author,
        content: content,
    };
    res.render("read.ejs", postData);
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

const articleTitles = [
    // "Fitness Fundamentals: Essential Exercises for Every Level",
    // "Achieve Your Fitness Goals: A Step-by-Step Guide",
    // "Boost Your Energy: Fitness Tips for a Vibrant Lifestyle",
    // "Nutrition and Fitness: The Perfect Pair for Optimal Health",
    // "Fitness on the Go: Quick Routines for Busy Schedules",
    // "The Power of Consistency: Daily Habits for Fitness Success",
    "Stay Motivated: Tips to Keep Your Fitness Journey on Track"
];

const imgThumbnails = [
    "images/fitness1.jpg"
]