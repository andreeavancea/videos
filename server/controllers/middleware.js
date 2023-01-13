const { User } = require("../models");

const middleware = {
    checkLogin: async (req, res, next) => {
        const { token, id } = req.session;
        if (!token || !id) {
            res.status(403).send({ message: "Forbidden" });
        } else {
            const user = await User.findOne({ where: { token, id }, raw: true });

            if (!user) {
                res.status(403).send({ message: "Forbidden" });
            } else {
                next();
            }
        }
    },
};
module.exports = middleware;
