const express = require("express");
const router = express.Router();
const usersService = require("./service");

router.get("/api/users", usersService.getUsers);
router.post("/api/users", usersService.addUser);
router.post("/api/users/update", usersService.updateUser);
router.delete("/api/users", usersService.deleteUser);
module.exports = router;
