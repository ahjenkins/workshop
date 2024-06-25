import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "john";
const yourPassword = "pass";
const yourAPIKey = "1ed73ca4-5811-4835-af02-4d1c38596761";
const yourBearerToken = "55996e2b-2c09-4982-ac67-7441c89f6470";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  //TODO 2: Use axios to hit up the /random endpoint
  //The data you get back should be sent to the ejs file as "content"
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
  const response = await axios.get("https://secrets-api.appbrewery.com/random");
  const result = response.data;
  res.render("index.ejs", { content: result.secret });
});

app.get("/basicAuth", async (req, res) => {
  //TODO 3: Write your code here to hit up the /all endpoint
  //Specify that you only want the secrets from page 2
  //HINT: This is how you can use axios to do basic auth:
  // https://stackoverflow.com/a/74632908
  const response = await axios.get("https://secrets-api.appbrewery.com/all?page=2", {
    auth: {
      username: yourUsername,
      password: yourPassword,
    },
  });
  const result = response.data;
  const random = Math.floor(Math.random() * result.length);
  res.render("index.ejs", { content: result[random].secret });
});

app.get("/apiKey", async (req, res) => {
  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.
  const response = await axios.get(`https://secrets-api.appbrewery.com/filter?score=5&apiKey=${yourAPIKey}`);
  const result = response.data;
  const random = Math.floor(Math.random() * result.length);
  res.render("index.ejs", { content: result[random].secret });
});

app.get("/bearerToken", async (req, res) => {
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  
  const response = await axios.get("https://secrets-api.appbrewery.com/secrets/42", {
    headers: { 
      Authorization: `Bearer ${yourBearerToken}` 
    },
  });
  const result = response.data;
  res.render("index.ejs", { content: result.secret });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
