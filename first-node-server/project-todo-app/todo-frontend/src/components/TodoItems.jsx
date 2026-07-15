import TodoItem from "./TodoItem";
// import styles from "./TodoItems.module.css";

const TodoItems = ({ todoItems, onDeleteClick }) => {
  return (
    <div className="w-full max-w-2xl px-4 text-left">
      {todoItems.map((item) => (
        <TodoItem
          key={item.id}
          todoId={item.id}
          todoDate={item.dueDate}
          todoName={item.name}
          onDeleteClick={onDeleteClick}
        ></TodoItem>
      ))}
    </div>
  );
};

export default TodoItems;
