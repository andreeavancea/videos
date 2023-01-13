const express = require("express");
const router = express.Router();
const {  video } = require("../controllers");

//video
router.post("/", video.addVideo);
router.delete("/", video.deleteVideo);
router.put("/", video.editVideo);
router.get("/", video.getVideosPerUser);

router.get("/all", video.getAllVideos);

module.exports = router;
