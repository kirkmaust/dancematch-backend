const express = require("express");
const cors = require("cors");
const { matchDanceStyles } = require("./bpmDanceMap");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/ping", (req, res) => {
  res.send("DanceMatch backend is alive!");
});

app.post("/identify", (req, res) => {
  const result = {
    title: "Uptown Funk",
    artist: "Mark Ronson ft. Bruno Mars",
    genre: "Funk",
    bpm: 115
  };

  const dances = matchDanceStyles(result.genre, result.bpm);
  res.json({ ...result, dances });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ DanceMatch backend running on port ${PORT}`);
});