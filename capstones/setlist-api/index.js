import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import axios from 'axios';

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true}));

const apiKey = process.env.API_KEY;
const headers = {
    'Accept': 'application/json',
    'x-api-key': apiKey,
    'Accept-Language': 'en'
}

app.get("/", (req, res) => {
    res.render("index.ejs");
})

// app.get("/setlist", (req, res) => {
// })

app.listen(port, (req, res) => {
    console.log(`Server listening on port ${port}`);
})