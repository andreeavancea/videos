const express = require("express");
const router = express.Router();
const { reset, middleware } = require("../controllers");

const authRouter = require("./auth");
const videoRouter = require("./video");

//reset
router.get("/reset", reset.reset);

router.use("/videos", middleware.checkLogin, videoRouter);
router.use("/", authRouter);

module.exports = router;
