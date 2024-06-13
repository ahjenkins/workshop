import express from "express";
const app = express();
const port = 3000;

const date = new Date();
let day = date.getDay();
let weekday = false;
let dayText = "";
let message = "";
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

if (day == 0 || day == 7) {
    weekday = false; 
} else {
    weekday = true;
}

if (weekday) {
    dayText = "weekday";
    message = "work hard!";
} else {
    dayText = "weekend";
    message = "have fun!";
}

app.get("/", (req, res) => {
    res.render("index.ejs", {
        "weekday": dayText,
        "message": message
    });
    console.log(days[day]);
});

app.listen(port, () => {
    console.log(`Server listening on ${port}`);
});