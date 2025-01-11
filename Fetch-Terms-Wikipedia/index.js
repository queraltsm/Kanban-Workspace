import express from 'express';
import fetch from 'node-fetch';

const app = express();
const port = 3000;

app.get('/fetch-wikipedia', async (req, res) => {
    const term = req.query.term || 'ECMAScript';
    const url = `https://en.wikipedia.org/w/api.php?action=query&prop=revisions&titles=${term}&rvslots=*&rvprop=content&format=json`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data from Wikipedia' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});