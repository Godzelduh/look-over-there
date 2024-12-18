import express from 'express';
import * as dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.get('/api/textSearch', async (_req, res) => {
  const query = _req.query.query as string;
  const apiKey = process.env.GOOGLE_MAP_API_KEY;

    if (!query) {
        res.status(400).json({ error: 'Query is required' });
        return;
    }
  try {
    const response = await fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${apiKey}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data 333' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});