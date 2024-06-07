const express = require("express");
const router = express.Router();
const TodoController = require("../controllers/todoController");

router.post("/", TodoController.create);
router.get("/", TodoController.get);
router.get("/:id", TodoController.getOne);
router.delete("/:id", TodoController.softDelete);
router.patch("/restore/:id", TodoController.restore);
router.get("/delete/:id", TodoController.findAllDelete);

module.exports = router;
