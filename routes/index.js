const express = require("express");
const router = express.Router();
const users = require("./user");
const todos = require("./todo");

router.use("/users", users);
router.use("/todos", todos);

module.exports = router;
