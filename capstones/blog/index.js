import express from "express";
const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.send("hello, world");
});

app.get("/create", (req, res) => {
    res.send("create");
    // res.sendFile("post-create.ejs");
});

app.get("/update", (req, res) => {
    res.send("update");
    // res.sendFile("post-update.ejs");
});

app.get("/view", (req, res) => {
    res.send("view");
    // res.sendFile("post-view.ejs");
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});