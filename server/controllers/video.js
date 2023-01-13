const {Video} = require("../models");

const controller = {
    addVideo: async (req, res) => {
        try {
            const {title, author, url, rating} = req.body;

            const errors = [];

            if (!title) {
                errors.push("title is empty");
            }

            if (!author) {
                errors.push("author is empty");
            }
            if (!url) {
                errors.push("url is empty");
            }
            if (!rating) {
                errors.push("rating is empty");
            }

            if (errors.length === 0) {
                const video = await Video.create({
                    title,
                    author,
                    url,
                    rating,
                    userId: req.session.id,
                });
                res.status(201).send({
                    message: `Video was successfully added`,
                });
            } else {
                res.status(400).send({errors});
            }
            //
        } catch (e) {
            console.error(e);
            res.status(500).send({
                message: "Error",
            });
        }
    },
    getVideosPerUser: async (req, res) => {
        try {
            const videos = await Video.findAll({
                where: {userId: req.session.id},
            });
            res.status(200).send(videos);

            //
        } catch (e) {
            console.error(e);
            res.status(500).send({
                message: "Error",
            });
        }
    },

    getAllVideos: async (req, res) => {
        try {
            const videos = await Video.findAll();
            res.status(200).send(videos);

            //
        } catch (e) {
            console.error(e);
            res.status(500).send({
                message: "Error",
            });
        }
    },
    editVideo: async (req, res) => {
        try {
            const {title, author, url, rating, id} = req.body;

            const errors = [];
            const video = await Video.findOne({where: {id}});

            if (!video) {
                errors.push("Video doesn't exists");
            }

          if (!title) {
            errors.push("title is empty");
          }

          if (!author) {
            errors.push("author is empty");
          }
          if (!url) {
            errors.push("url is empty");
          }
          if (!rating) {
            errors.push("rating is empty");
          }

            if (errors.length === 0) {
                await video.update({
                    ...video,
                    title,
                    url,
                    author,
                    rating,
                });

                res.status(200).send({
                    message: `Video was successfully edited`,
                });
            } else {
                res.status(400).send({errors});
            }
            //
        } catch (e) {
            console.error(e);
            res.status(500).send({
                message: "Error",
            });
        }
    },
    deleteVideo: async (req, res) => {
        try {
            const {id} = req.body;

            const errors = [];
            const video = await Video.findOne({where: {id}});

            if (!video) {
                errors.push("Video doesn't exists");
            }

            if (errors.length === 0) {
                await video.destroy();

                res.status(200).send({
                    message: `Video was successfully deleted`,
                });
            } else {
                res.status(400).send({errors});
            }
            //
        } catch (e) {
            console.error(e);
            res.status(500).send({
                message: "Error",
            });
        }
    },
};

module.exports = controller;
