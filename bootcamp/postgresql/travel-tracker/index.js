import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "postgres",
  port: 5432
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  //Write your code here.
  const result = await db.query("SELECT * FROM visited_countries");
  console.log(result.rows);
  
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  })
  // console.log(countries);

  let total = countries.length;
  db.end();
  res.render("index.ejs", {countries, total});
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
