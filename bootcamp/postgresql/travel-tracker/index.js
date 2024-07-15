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

async function checkVisited() {
  const result = await db.query("SELECT * FROM visited_countries");
  console.log(result.rows);
  
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  })

  return countries;
}

app.get("/", async (req, res) => {
  //Write your code here.
  const countries = await checkVisited();
  let total = countries.length;
  res.render("index.ejs", {countries, total});
  // db.end();
});

app.post("/add", async (req, res) => {
  const addedCountry = req.body.country;
  try {
    const result = await db.query(`SELECT * FROM countries WHERE country_name='${addedCountry}'`);
    const addedCountryCode = result.rows[0].country_code;
    try {
      if (result.rows.length !== 0) {
        const data = await db.query("INSERT INTO visited_countries (country_code) VALUES ($1)", [addedCountryCode]);
        res.redirect("/");
      }
    } catch (err) {
      console.log(err);
      const countries = await checkVisited();
      res.render("index.ejs", {
        countries,
        total: countries.length,
        error: "Country has already been added, try again"
      })
    }
  } catch (err) {
    console.log(err);
    const countries = await checkVisited();
    res.render("index.ejs", {
      countries,
      total: countries.length,
      error: "Country name does not exist, try again."
    })
  }
  
    
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
