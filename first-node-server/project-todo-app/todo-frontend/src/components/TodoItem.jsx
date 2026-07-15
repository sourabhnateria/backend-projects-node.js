function TodoItem({ todoName, todoDate, todoId, onDeleteClick }) {
  return (
    /* 
      TAILWIND MAPPING:
      - .kg-row { margin: 10px 5px } -> my-2.5 mx-1.25 (or simply my-2 mx-1)
      - Bootstrap row / col layout  -> grid grid-cols-12 items-center gap-2
      - col-6 -> col-span-6
      - col-4 -> col-span-4
      - col-2 -> col-span-2
    */
    <div className="grid grid-cols-12 gap-2 items-center my-2.5 mx-1.25 p-2 bg-gray-50 rounded-md shadow-sm">
      <div className="col-span-6 font-medium text-gray-800 break-all">
        {todoName}
      </div>
      <div className="col-span-4 text-gray-500">{todoDate}</div>
      <div className="col-span-2 text-right">
        {/* 
          - btn-danger -> bg-red-600 hover:bg-red-700 text-white
          - .kg-button { min-width: 80px } -> min-w-[80px]
        */}
        <button
          type="button"
          className="bg-red-600 hover:bg-red-700 text-white font-medium py-1.5 px-3 rounded transition duration-200 min-w-[80px] text-sm"
          onClick={() => onDeleteClick(todoId)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
