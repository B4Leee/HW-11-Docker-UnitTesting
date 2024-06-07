const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");
const auth = require("../middleware/auth");

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/", auth, UserController.get);
router.get("/:id", UserController.getOne);
router.get("/:id", UserController.delete);

module.exports = router;
