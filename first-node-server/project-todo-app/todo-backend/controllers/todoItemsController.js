const TodoItem = require("../models/TodoItem");

exports.getAllTodoItems = async (req, res, next) => {
  const todoItems = await TodoItem.find();
  res.status(200).json(todoItems);
};

exports.createTodoItem = async (req, res, next) => {
  console.log(req.body);
  const { task, date } = req.body;
  const todoItem = new TodoItem({ task, date });
  await todoItem.save();
  res.status(201).json(todoItem);
};

exports.deleteTodoItem = async (req, res, next) => {
  try {
    const id = req.params.id;
    const todoItem = await TodoItem.findByIdAndDelete(id);

    if (!todoItem) {
      return res.status(404).json({ error: "Todo item not found" });
    }

    res.status(200).json(todoItem);
  } catch (error) {
    console.error("Error deleting todo item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateTodoItem = async (req, res, next) => {
  const id = req.params.id;
  const todoItem = await TodoItem.findById(id);
  todoItem.completed = true;
  await todoItem.save();
  res.status(200).json(todoItem);
};
