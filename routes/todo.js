const express = require("express");
const todo_controller = require("../controllers/todo_controller");
const auth_controller = require("../controllers/auth_controller");
const validate = require("../middlewares/validation");
const authorize = require("../middlewares/auth");

const router = express();
router.get("/", todo_controller.getHome);
router.post("/register",validate, auth_controller.postUser);
router.post("/login",validate, auth_controller.postLogin);
router.get("/is-verified",authorize, auth_controller.getAuthorization);
// router.post("/", authorize, todo_controller.getHome);
router.post("/create-todo", todo_controller.createTodo);
router.get("/todos", todo_controller.getTodos);
router.get("/todos/:id", todo_controller.getTodo);
router.put("/todo/:id", todo_controller.updateTodo);
router.delete("/todo/:id", todo_controller.deleteTodo);

module.exports = router;
