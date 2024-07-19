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
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentUserId = 1;

let users = [
  { id: 1, name: "Angela", color: "teal" },
  { id: 2, name: "Jack", color: "powderblue" },
];

async function checkVisisted() {
  const result = await db.query("SELECT * FROM users JOIN visited_countries ON users.id = visited_countries.user_id WHERE users.id=($1)", [currentUserId]);  
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });

  return countries;
}

async function getCurrentUser() {
  const result = await db.query("SELECT * FROM users");
  users = result.rows;
  const user = users.find((user) => user.id === currentUserId);
  return user;
}

app.get("/", async (req, res) => {
  const countries = await checkVisisted();
  // console.log(countries);
  const currentUser = await getCurrentUser();
  // console.log(currentUser);

  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    users: users,
    color: "teal"
  });
});
app.post("/add", async (req, res) => {
  const input = req.body["country"];
  // console.log(currentUserId);

  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );

    const data = result.rows[0];
    const countryCode = data.country_code;
    try {
      await db.query(
        "INSERT INTO visited_countries (country_code, user_id) VALUES ($1, ($2))",
        [countryCode, currentUserId]
      );
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
});
app.post("/user", async (req, res) => {
  // console.log(req.body);
  const selectedUser = req.body.user;

  try {
    if (selectedUser > 0) {
      currentUserId = selectedUser;
      // console.log("current", currentUserId, "selected", selectedUser);
      
      // get selectedUser's color
      const userInfo = await db.query("SELECT * FROM users WHERE id=($1)", [currentUserId]);
      const color = userInfo.rows[0].color;

      // get selectedUser's countries
      const result = await db.query("SELECT * FROM users JOIN visited_countries ON users.id = visited_countries.user_id WHERE users.id=($1)", [currentUserId]);
      // console.log(result.rows);
      
      let countries = [];
      result.rows.forEach((country) => {
        countries.push(country.country_code);
      });
      // console.log(countries);
      
      try {
        if (countries.length > 0) {
          res.render("index.ejs", {
            countries,
            total: countries.length,
            users,
            color
          })
        } else {
          res.render("index.ejs", {
            countries,
            total: countries.length,
            users,
            color
          })
        }
      } catch (err) {
        console.error(err.message);
      }
    } else {
      // console.log("adding new user");
      res.render("new.ejs")
    }
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/new", async (req, res) => {
  //Hint: The RETURNING keyword can return the data that was inserted.
  //https://www.postgresql.org/docs/current/dml-returning.html
  const newUser = req.body.name;
  const userColor = req.body.color;
  
  // add user to database
  const addUser = await db.query("INSERT INTO users (name, color) VALUES ($1, $2) RETURNING id, name, color", [newUser, userColor]);
  users.push(addUser.rows[0]);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
