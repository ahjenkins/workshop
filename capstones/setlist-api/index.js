import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;


app.listen(port, (req, res) => {
    console.log(`Server listening on port ${port}`);
})