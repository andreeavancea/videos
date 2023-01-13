module.exports = function (sequelize, DataTypes) {
  return sequelize.define("videos", {
    title: DataTypes.STRING,
    url: DataTypes.STRING,
    author: DataTypes.STRING,
    rating: DataTypes.FLOAT,
  });
};
