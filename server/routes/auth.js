const express = require("express");
const router = express.Router();
const { auth, middleware } = require("../controllers");

//user
router.post("/register", auth.register);
router.post("/login", auth.login);
router.get("/logout", middleware.checkLogin, auth.logout);

router.put("/user", middleware.checkLogin, auth.editUser);

router.delete("/user", middleware.checkLogin, auth.deleteAccount);

module.exports = router;
