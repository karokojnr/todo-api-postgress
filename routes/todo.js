const express = require("express");
const todo_controller = require("../controllers/todo_controller");

const router = express();

router.post("/create-todo", todo_controller.createTodo);
router.get("/todos", todo_controller.getTodos);
router.get("/todos/:id", todo_controller.getTodo);
router.put("/todo/:id", todo_controller.updateTodo);
router.delete("/todo/:id", todo_controller.deleteTodo);

module.exports = router;