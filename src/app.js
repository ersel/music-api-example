const express = require("express");
const { createArtist, getAllArtists, getArtistById, deleteArtistById } = require("./controllers/Artist");
const app = express();

app.use(express.json());

app.post("/artists", createArtist);
app.get("/artists", getAllArtists);
app.get("/artists/:artistId", getArtistById);
app.delete("/artists/:artistId", deleteArtistById);

module.exports = app;
