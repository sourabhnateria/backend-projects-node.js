const express = require("express");
const todoItemsRouter = express.Router();
const todoItemsController = require("../controllers/todoItemsController");

todoItemsRouter.post("/", todoItemsController.createTodoItem);
todoItemsRouter.get("/", todoItemsController.getAllTodoItems);
// todoItemsRouter.get("/:id", todoItemsController.getTodoItemById);
todoItemsRouter.put("/:id/completed", todoItemsController.updateTodoItem);
todoItemsRouter.delete("/:id", todoItemsController.deleteTodoItem);

module.exports = todoItemsRouter;
