import { useState } from "react";

function AddTodo({ onNewItem }) {
  // FIXED: Initialized states as empty strings to prevent React uncontrolled input warnings
  const [todoName, setTodoName] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleNameChange = (event) => {
    setTodoName(event.target.value);
  };

  const handleDateChange = (event) => {
    setDueDate(event.target.value);
  };

  const handleAddButtonClicked = (event) => {
    // If wrapping in a form later or clicking, ensure we block empty inputs
    if (todoName.trim() === "") return;

    onNewItem(todoName, dueDate);
    setDueDate("");
    setTodoName("");
  };

  return (
    /* 
      TAILWIND MAPPING:
      - container text-center -> container mx-auto text-center max-w-2xl px-4
      - row kg-row            -> grid grid-cols-12 gap-2 items-center my-2.5 mx-1.25
      - col-6 / col-4 / col-2 -> col-span-6 / col-span-4 / col-span-2
    */
    <div className="container max-w-2xl px-4 mx-auto text-center">
      <div className="grid grid-cols-12 gap-2 items-center my-2.5 mx-1.25">
        {/* Input 1 Column (6/12 width) */}
        <div className="col-span-6">
          <input
            type="text"
            placeholder="Enter Todo Here"
            value={todoName}
            onChange={handleNameChange}
            className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
          />
        </div>

        {/* Input 2 Column (4/12 width) */}
        <div className="col-span-4">
          <input
            type="date"
            value={dueDate}
            onChange={handleDateChange}
            className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
          />
        </div>

        {/* Button Column (2/12 width) */}
        <div className="col-span-2 text-right">
          {/* 
            - btn-success -> bg-green-600 hover:bg-green-700 text-white
            - .kg-button { min-width: 80px } -> min-w-[80px]
          */}
          <button
            type="button"
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-1.5 px-4 rounded-md transition duration-200 min-w-[80px] text-sm shadow-sm cursor-pointer"
            onClick={handleAddButtonClicked}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddTodo;
