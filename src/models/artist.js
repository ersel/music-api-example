module.exports = (connection, DataTypes) => {
  // table = schema
  const schema = {
    name: {
      type: DataTypes.STRING,
      allowNull: false, // NOT NULL
      unique: true, // UNIQUE
    },
    genre: DataTypes.STRING,
  };
  const ArtistModel = connection.define("Artist", schema);
  return ArtistModel;
};
