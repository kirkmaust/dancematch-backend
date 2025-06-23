const express = require("express");
const cors = require("cors");
const { matchDanceStyles } = require("./bpmDanceMap");
const ACRCloud = require("acrcloud");

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

// ACRCloud config - replace with your actual credentials
const acr = new ACRCloud({
  host: "identify-us-west-2.acrcloud.com",
  access_key: "d1faa6991c67aa9b65da08934aa7fa0 ",
  access_secret: "6z4z7nUOZf6hAvyJYZBkDXbQVD9i9vqlnoIHQjWW"
});

app.get("/ping", (req, res) => {
  res.send("DanceMatch backend with ACRCloud is alive!");
});

app.post("/identify", async (req, res) => {
  const { audioBase64 } = req.body;

  try {
    const result = await acr.identify(audioBase64);
    const metadata = JSON.parse(result.metadata?.music?.[0] ? JSON.stringify(result.metadata.music[0]) : "{}");

    const song = {
      title: metadata.title || "Unknown",
      artist: metadata.artists?.[0]?.name || "Unknown",
      genre: metadata.genres?.[0]?.name || "Pop",
      bpm: metadata.bpm || 115
    };

    const dances = matchDanceStyles(song.genre, song.bpm);
    res.json({ ...song, dances });
  } catch (err) {
    console.error("ACRCloud error:", err);
    res.status(500).json({ error: "Song identification failed." });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🎧 DanceMatch backend with ACRCloud running on port ${PORT}`);
});
