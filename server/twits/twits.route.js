const express = require("express");
const router = express.Router();
const usersService = require("./service/twits");

router.post("/api/twits", usersService.addTwit);
router.get("/api/twits", usersService.getTwits);
router.delete("/api/twits", usersService.deleteTwit);
module.exports = router;
