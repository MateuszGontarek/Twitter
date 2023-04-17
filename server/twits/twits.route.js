const express = require("express");
const router = express.Router();
const usersService = require("./service/twits");

router.post("/api/twits", usersService.addTwit);
router.get("/api/twits", usersService.getTwits);
router.delete("/api/twits", usersService.deleteTwit);
router.post("/api/twits-comment", usersService.addComment);
router.post("/api/twits-like", usersService.addLike);
router.get("/api/twits/find", usersService.getTwitsByHashtag);
module.exports = router;
