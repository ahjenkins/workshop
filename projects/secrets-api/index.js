// HINTS:
// 1. Import express and axios
// 2. Create an express app and set the port number.
// 3. Use the public folder for static files.

import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.send("hello world");
    // res.render("index.ejs");
})


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})





// 4. When the user goes to the home page it should render the index.ejs file.

// 5. Use axios to get a random secret and pass it to index.ejs to display the
// secret and the username of the secret.

// 6. Listen on your predefined port and start the server.
