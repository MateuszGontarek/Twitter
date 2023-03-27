const express = require("express");
const router = express.Router();
const loginService = require("./service");

router.post("/api/login", loginService.login);
router.post("/api/login/user", loginService.loginUser);
module.exports = router;
