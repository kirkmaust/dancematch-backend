const mapping = [
  { style: "Cha-Cha", min: 112, max: 128, genres: ["Pop", "Latin", "Dance", "Funk"] },
  { style: "Slow Cha-Cha", min: 90, max: 111, genres: ["Latin", "Pop", "Funk"] },
  { style: "Hustle", min: 110, max: 128, genres: ["Disco", "Funk", "Pop"] },
  { style: "East Coast Swing", min: 110, max: 128, genres: ["Pop", "Swing", "Rock"] },
  { style: "West Coast Swing", min: 80, max: 108, genres: ["R&B", "Blues", "Funk", "Pop", "Latin"] },
  { style: "Rumba", min: 88, max: 104, genres: ["Latin", "Ballad", "Romantic", "Pop"] },
  { style: "Bolero", min: 76, max: 92, genres: ["Latin", "Ballad", "Slow Rock"] }
];

function matchDanceStyles(genre, bpm) {
  return mapping
    .filter(d =>
      bpm >= d.min &&
      bpm <= d.max &&
      d.genres.includes(genre)
    )
    .map(d => d.style);
}

module.exports = { matchDanceStyles };
