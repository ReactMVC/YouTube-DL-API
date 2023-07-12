const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

const apiBaseUrl = "https://api.ytbvideoly.com/api/thirdvideo/parse";

const getData = async (url) => {
    const apiUrl = API(url);
    const jsonData = await sendRequest(apiUrl);
    return jsonData;
}

const API = (url) => {
    return `${apiBaseUrl}?from=videodownloaded&link=${encodeURIComponent(url)}`;
}

const sendRequest = async (url) => {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

app.get('/', async (req, res) => {
    const videoUrl = req.query.url;

    if (videoUrl) {
        const videoData = await getData(videoUrl);
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send(JSON.stringify(videoData, null, 2));
    } else {
        const data = {
            status: false,
            message: "Please provide a URL parameter."
        };
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(400).send(JSON.stringify(data, null, 2));
    }
});

app.listen(port, () => {
    console.log(`DarkTube API listening at http://localhost:${port}`);
});