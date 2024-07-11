import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import axios from 'axios';

dotenv.config();

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true}));

const apiKey = process.env.API_KEY;

const headers = {
    'Accept': 'application/json',
    'x-api-key': apiKey
}

// const setlist_API_URL = "https://api.setlist.fm/rest/1.0";

app.get("/", (req, res) => {
    res.render("index.ejs");
})

app.get("/artist", async (req, res) => {
    console.log("test");
    // const result = axios.get(setlist_API_URL + "/search/artists?tate", headers);
    const result = await axios.get("https://api.setlist.fm/rest/1.0/search/artists?artistName=Tate Mcrae&p=1&sort=sortName", {headers});
    console.log(result.data);
})

app.post("/search-artist", (req, res) => {
    // console.log(req.body);
    const artist = req.body.artist;
    console.log(artist);
})

// app.get("/setlist", (req, res) => {
// })

app.listen(port, (req, res) => {
    console.log(`Server listening on port ${port}`);
})