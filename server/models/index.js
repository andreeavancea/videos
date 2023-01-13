const sequelize = require("../config/db");

const User = sequelize.import("./user");
const Video = sequelize.import("./video");

User.hasMany(Video, { onDelete: "Cascade" });

module.exports = { Video, User, sequelize };
