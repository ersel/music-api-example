const { Artist } = require("../../models");

const createArtist = (req, res) => {
  Artist.create(req.body)
    .then((databaseYaratilanRecord /* instance of a Model, a row of data */) => {
      res.status(201).send(databaseYaratilanRecord);
    })
    .catch((error) => {
      console.log({ error });
      res.status(400).send("Not OK");
    });
};

/*
const createArtist = async (req, res) => {
  try {
    const sonuc = await Artist.create(req.body);
    res.status(201).send(sonuc);
  } catch (error) {
    console.log({ error });
    res.status(400).send("Not OK");
  }
};
*/

const getAllArtists = (req, res) => {
  const genreToSearch = req.query.genre;
  let filter = {};
  if (genreToSearch) {
    filter = { where: { genre: genreToSearch } };
  }
  Artist.findAll(filter).then((records) => {
    res.status(200).send(records);
  });
};

const getArtistById = (req, res) => {
  const artistId = req.params.artistId;
  Artist.findByPk(artistId).then((records) => {
    res.status(200).send(records);
  });
};

const deleteArtistById = (req, res) => {
  const artistId = req.params.artistId;
  Artist.destroy({ where: { id: artistId } }).then((sonuc) => {
    res.status(200).send("Deleted");
  }).catch(error => {
      console.log({error})
      res.status(400).send("NOT OK!");
  })
};

module.exports = { createArtist, getAllArtists, getArtistById, deleteArtistById };
