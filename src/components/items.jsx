import React from "react";

const items = ({ text, isComplete, id, toggleTodo, deleteTodo }) => {
  return (
    <div className="flex justify-between items-center">
      <label
        className={`hover:bg-slate-200 flex-1 p-2 rounded-md cursor-pointer select-none ${
          isComplete ? "line-through text-slate-600" : ""
        }`}
        onClick={() => toggleTodo(id)}
      >
        {text}
      </label>
      <div>
        <div
          className="size-[26px] hover:bg-red-100 rounded-md"
          onClick={() => {
            deleteTodo(id);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#9F9F9E"
          >
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default items;
