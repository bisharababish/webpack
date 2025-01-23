const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const aylien = require('aylien_textapi');

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const textapi = new aylien({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY,
});
console.log('Aylien API ID:', process.env.API_ID);
console.log('Aylien API Key:', process.env.API_KEY);
app.post('/analyze', (req, res) => {
    console.log('Received request with URL:', req.body.url);
    textapi.sentiment({
        url: req.body.url,
    }, (error, response) => {
        if (error) {
            console.error('Aylien API error:', error);
            res.status(500).send(error);
        } else {
            console.log('Aylien API response:', response);
            res.send(response);
        }
    });
});
const PORT = process.env.PORT || 8082;

app.listen(PORT, () => {
    console.log(`"Server running on port ${PORT}`);
});