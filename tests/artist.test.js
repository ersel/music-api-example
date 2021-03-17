/* tests/artists.test.js */
const { expect } = require("chai");
const request = require("supertest");
const { Artist } = require("../src/models");
const app = require("../src/app");

describe("/artists", () => {
  before(async () => {
    try {
      await Artist.sequelize.sync();
    } catch (error) {
      throw error;
    }
  });

  beforeEach(async () => {
    try {
      await request(app).post("/artists").send({
        name: "Tame Impala",
        genre: "Rock",
      });
      await request(app).post("/artists").send({
        name: "The Pineapple Thief",
        genre: "Rock",
      });
      await request(app).post("/artists").send({
        name: "Jay Z",
        genre: "Rap",
      });
    } catch (error) {
      throw error;
    }
  });

  afterEach(async () => {
    try {
      await Artist.destroy({ where: {} });
    } catch (error) {
      throw error;
    }
  });

  describe("POST /artists", () => {
    it("creates a new artist in the database", async () => {
      try {
        const response = await request(app).post("/artists").send({
          name: "Sensijam",
          genre: "Reggae",
        });
        expect(response.status).to.equal(201);
      } catch (error) {
        throw error;
      }
    });
  });

  describe("GET /artists", () => {
    it("should get a list of artists from the db", async () => {
      try {
        const response = await request(app).get("/artists").send();
        expect(response.body).to.have.lengthOf(3);
      } catch (error) {
        throw error;
      }
    });

    it("should get an artist by id", async () => {
        try {
          const artistList = await request(app).get("/artists").send();
          const sampleArtistId = artistList.body[0].id;
          const artistByIdResponse = await request(app).get(`/artists/${sampleArtistId}`).send();
          expect(artistByIdResponse.status).to.equal(200);
          expect(artistByIdResponse.body.id).to.equal(sampleArtistId);
        } catch (error) {
          throw error;
        }
      });


    it("should delete an artist by id", async () => {
        try {
          const artistList = await request(app).get("/artists").send();
          const sampleArtistId = artistList.body[0].id;
          const artistByIdResponse = await request(app).delete(`/artists/${sampleArtistId}`).send();
          expect(artistByIdResponse.status).to.equal(200);
          const artistResponse = await request(app).get(`/artists/${sampleArtistId}`).send();
          expect(artistResponse.body).to.eql({});
        } catch (error) {
          throw error;
        }
      });

    it("should get a list of artists filtered by genre", async () => {
      try {
        const rockArtists = await request(app)
          .get("/artists?genre=Rock")
          .send();
        expect(rockArtists.body).to.have.lengthOf(2);
        const rappers = await request(app).get("/artists?genre=Rap").send();
        expect(rappers.body).to.have.lengthOf(1);
      } catch (error) {
        throw error;
      }
    });
  });
});
