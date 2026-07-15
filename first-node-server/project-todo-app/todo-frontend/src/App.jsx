import AppName from "./components/AppName";
import AddTodo from "./components/AddTodo";
import TodoItems from "./components/TodoItems";
import WelcomeMessage from "./components/WelcomeMessage";
import "./App.css";
import { useEffect, useState } from "react";
import {
  addItemToServer,
  deleteItemFromServer,
  getAllItemsFromServer,
  markItemCompletedOnServer,
  updateItemFromServer,
} from "./services/itemsService";
// import { get } from "mongoose";

function App() {
  const [todoItems, setTodoItems] = useState([]);

  useEffect(() => {
    getAllItemsFromServer().then((items) => setTodoItems(items));
  }, []);

  const handleNewItem = async (itemName, itemDueDate) => {
    console.log(`New Item Added: ${itemName} Date:${itemDueDate}`);
    const serverItem = await addItemToServer(itemName, itemDueDate);
    const newTodoItems = [...todoItems, serverItem];
    setTodoItems(newTodoItems);
  };

  const handleDeleteItem = async (todoItemId) => {
    console.log(`Deleting item with id: ${todoItemId}`);
    try {
      await deleteItemFromServer(todoItemId);
      const newTodoItems = todoItems.filter((item) => item.id !== todoItemId);
      setTodoItems(newTodoItems);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleToggleComplete = async (todoItemId) => {
    await markItemCompletedOnServer(todoItemId);
    const updatedItem = todoItems.map((item) => {
      if (item.id === todoItemId) {
        return {
          ...item,
          completed: true,
        };
      }
      return item;
    });

    setTodoItems(updatedItem);
  };

  return (
    <center className="todo-container">
      <AppName />
      <AddTodo onNewItem={handleNewItem} />

      {todoItems.length === 0 && <WelcomeMessage></WelcomeMessage>}
      <TodoItems
        onToggleComplete={handleToggleComplete}
        todoItems={todoItems}
        onDeleteClick={handleDeleteItem}
      ></TodoItems>
    </center>
  );
}

export default App;
