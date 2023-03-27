const express = require("express");
const router = express.Router();
const usersService = require("./service");

router.get("/api/users", usersService.getUsers);
router.post("/api/users", usersService.addUser);
router.delete("/api/users", usersService.deleteUser);
router.get("/api/users/validate", usersService.validateEmail);
module.exports = router;
