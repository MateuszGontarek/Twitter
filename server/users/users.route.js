const express = require("express");
const router = express.Router();
const usersService = require("./service");

router.get("/api/users", usersService.getUsers);
router.get("/api/users/public-info", usersService.getTwitHeaderInfo);
router.post("/api/users", usersService.addUser);
router.put("/api/users/update", usersService.updateUser);
router.delete("/api/users", usersService.deleteUser);
module.exports = router;
