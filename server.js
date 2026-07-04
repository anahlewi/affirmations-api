import express from 'express';
import fs from 'fs/promises';
import path from 'path';


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse incoming JSON payloads
app.use(express.json());

// API Endpoint to read and return the JSON file
app.get('/api/data', async (req, res) => {
  try {
    const filePath = new URL('./affirmations.json', import.meta.url);
    const fileData = await fs.readFile(filePath, 'utf-8');
    const jsonObject = JSON.parse(fileData);

    return res.status(200).json(jsonObject);
    
  } catch (error) {
    // Handle cases where file does not exist or has bad syntax
    return res.status(500).json({ error: 'Failed to read data file.' });
  }
});

app.get('/api/random', async (req, res) => {
    try {
        const filePath = new URL('./affirmations.json', import.meta.url);
        const fileData = await fs.readFile(filePath, 'utf-8');
        const jsonObject = JSON.parse(fileData);
        const affirmations = jsonObject.affirmations;
        const randomAffirmation = affirmations[Math.floor(Math.random() * affirmations.length)];
        return res.status(200).json(randomAffirmation);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to read data file.' });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 API is live on http://localhost:${PORT}`);
});