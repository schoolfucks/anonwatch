const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const FILE = 'videos.json';

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/videos', (req, res) => {
  if (!fs.existsSync(FILE)) return res.json([]);
  const data = fs.readFileSync(FILE);
  res.json(JSON.parse(data));
});

app.post('/videos', (req, res) => {
  const { videoId } = req.body;
  if (!videoId) return res.status(400).send("Missing videoId");

  let videos = [];
  if (fs.existsSync(FILE)) {
    videos = JSON.parse(fs.readFileSync(FILE));
  }

  if (!videos.includes(videoId)) {
    videos.unshift(videoId); // Add to top
    fs.writeFileSync(FILE, JSON.stringify(videos, null, 2));
  }

  res.json({ success: true });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
