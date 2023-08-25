import React, { useContext } from "react";
import { TodoListContext } from "../../store/context";
import clsx from "clsx";

function AddNewButton({ status, inputRef }) {
  const { dispatch } = useContext(TodoListContext);

  const handleAddNewTask = (status) => {
    const id = (Math.floor(Math.random() * 10000) + 10).toString();
    dispatch({ type: "create-task", data: { id, status } });
    inputRef.current = id;
  };
  return (
    <div
      onClick={() => handleAddNewTask(status)}
      className={clsx("flex gap-[10px] items-center px-[10px] cursor-pointer", {
        ["text-todo-taskNew"]: status === "Todo",
        ["text-doing-taskNew"]: status === "Doing",
      })}
    >
      <p className="text-md font-semibold">+</p>
      <p className="text-md font-semibold">New</p>
    </div>
  );
}

export default AddNewButton;
