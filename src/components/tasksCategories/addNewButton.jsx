import React, { useContext } from "react";
import { TodoListContext } from "../../store/context";
import clsx from "clsx";

function AddNewButton({ status, inputRef }) {
  // Destructure status and inputRef from props
  const { dispatch } = useContext(TodoListContext); // Use the TodoListContext with useContext hook

  const handleAddNewTask = (status) => {
    // Define a function to handle adding new tasks
    const id = (Math.floor(Math.random() * 10000) + 10).toString(); // Generate a random ID for the new task
    dispatch({ type: "create-task", data: { id, status } }); // Dispatch an action to create a new task
    inputRef.current = id; // Update the inputRef with the new ID
  };

  // Render the AddNewButton component
  return (
    <div
      onClick={() => handleAddNewTask(status)}
      className={clsx("flex gap-[10px] items-center px-[10px] cursor-pointer", {
        // Use clsx to conditionally apply classes based on status
        ["text-todo-taskNew"]: status === "Todo", // Apply text color class for "Todo" status
        ["text-doing-taskNew"]: status === "Doing", // Apply text color class for "Doing" status
      })}
    >
      <p className="text-md font-semibold">+</p> {/* Display the "+" symbol */}
      <p className="text-md font-semibold">New</p>
    </div>
  );
}

export default AddNewButton;
