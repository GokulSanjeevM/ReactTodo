import React, { useEffect, useRef, useState } from "react";
import Items from "./items";

const todo = () => {
  const [todoList, setTodoList] = useState(
    localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos"))
      : []
  );

  const [alert, setAlert] = useState(null);
  const inputRef = useRef();

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);

  //add new task
  const addTask = () => {
    const inputText = inputRef.current.value.trim();
    if (!inputText) {
      return null;
    }

    const newTodo = {
      id: Date.now(),
      text: inputText,
      isComplete: false,
    };

    setTodoList((prev) => [...prev, newTodo]);
    inputRef.current.value = "";
  };

  //update task status
  const toggleTodo = (id) => {
    setTodoList((prev) => {
      return prev.map((todo) =>
        id === todo.id ? { ...todo, isComplete: !todo.isComplete } : todo
      );
    });
  };

  // delete todo task
  const deleteTodo = (id) => {
    const todo = todoList.find((todo) => todo.id === id);

    if (!todo.isComplete) {
      setAlert("Only completed tasks can be deleted!");
      setTimeout(() => setAlert(null), 5000);
      return;
    }

    setTodoList((prev) => prev.filter((todo) => todo.id !== id));
    setAlert("Task deleted!");
    setTimeout(() => setAlert(null), 5000);
  };

  return (
    <>
      <div className="w-[30-rem]">
        <h1 className="text-lg my-2 font-medium text-amber-500">To-Do List</h1>
        <div className="flex gap-2">
          <div className="flex-1">
            <input
              ref={inputRef}
              type="text"
              className="py-3 px-4 w-full border focus:outline-none focus:border-amber-500"
              placeholder="Add task"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addTask();
                }
              }}
            />
          </div>
          <button
            className="py-3 px-4 bg-white text-sm font-medium rounded-sm border-none"
            onClick={addTask}
          >
            Add Task
          </button>
        </div>
        <p className="my-3 text-sm text-zinc-400 px-1">Fill task details</p>
      </div>

      {/* Alert */}
      {alert && (
        <div className="bg-red-200 text-red-800 px-4 py-2 rounded-md my-3">
          {alert}
        </div>
      )}

      <div className="w-[30-rem] bg-slate-100 shadow py-6 px-4">
        <fieldset className="space-y-2 ">
          <legend className="text-pink-600 font-medium">List of tasks</legend>
          {/* List Items */}
          {todoList.length === 0 ? (
            <p className="text-qray-500 text-sm">No tasks found</p>
          ) : (
            todoList.map((todo, index) => {
              return (
                <Items
                  text={todo.text}
                  key={index}
                  isComplete={todo.isComplete}
                  id={todo.id}
                  toggleTodo={toggleTodo}
                  deleteTodo={deleteTodo}
                />
              );
            })
          )}
        </fieldset>
      </div>
    </>
  );
};

export default todo;
