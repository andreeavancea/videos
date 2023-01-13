const express = require("express");
const bodyParser = require("body-parser");
const router = require("./routes");
const cors = require("cors");
const session = require("./config/session");

const serveStatic = require("serve-static");
const history = require("connect-history-api-fallback");
const port = process.env.PORT || require("../configuration").dev.port;
const { sequelize } = require("./models");

const app = express();

sequelize.sync();

const configure = (app) => {
  app.use(cors());
  app.use(session);
  app.use(bodyParser.json());
  // app.use(history());
  // app.use(serveStatic(__dirname + "/../client/build"));
  app.use("/api", router);
};
module.exports = configure;

configure(app);

app.listen(port, () => {
  console.log(`server started on http://localhost:${port}`);
});
