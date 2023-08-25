import React, { useContext, useState, useEffect, useRef } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import clsx from "clsx";
import handIcon from "../../../public/icons/icons8-flexed-biceps-48.png";
import celebrateIcon from "../../../public/icons/icons8-party-popper-48.png";
import { TodoListContext } from "../../store/context";
import TasksColumn from "../tasksColumn";
import AddNewButton from "./addNewButton";

function TasksCategories() {
  // Define TasksCategories component
  const [data, setData] = useState([]); // Initialize state for data
  const inputRef = useRef(); // Initialize a ref for input
  const { state, dispatch } = useContext(TodoListContext); // Use the TodoListContext with useContext hook
  const savedStateJSON = localStorage.getItem("tasks"); // Get saved tasks data from localStorage

  useEffect(() => {
    // Use effect to update data state
    if (!savedStateJSON) {
      const stateJSON = JSON.stringify(state?.tasks);
      localStorage.setItem("tasks", stateJSON);
      setData(state?.tasks);
    } else {
      setData(JSON.parse(savedStateJSON));
    }
  }, [savedStateJSON]);

  const onDragEnd = (result) => {
    // Define the onDragEnd function to handle drag and drop
    const { destination, source } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    if (source.droppableId === destination.droppableId) {
      // Reorder within the same column
      dispatch({
        type: "reorder-task-in-column",
        data: {
          droppableId: source.droppableId,
          destIndex: destination.index,
          srcIndex: source.index,
        },
      });
    } else {
      // Move between columns
      dispatch({
        type: "move-task-between-column",
        data: {
          srcDroppableId: source.droppableId,
          destDroppableId: destination.droppableId,
          srcIndex: source.index,
          destIndex: destination.index,
        },
      });
    }
  };

  // Render the TasksCategories component
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-rows-3 md:grid-rows-none md:grid-cols-3 gap-5">
        {data?.map((taskGroup) => {
          return (
            <div
              key={taskGroup.status}
              className={clsx("w-full h-full min-h-[40vh] rounded-md p-5", {
                ["bg-todo-bg"]: taskGroup.status === "Todo",
                ["bg-doing-bg"]: taskGroup.status === "Doing",
                ["bg-done-bg"]: taskGroup.status === "Done",
              })}
            >
              <div className="flex justify-between">
                <div className="flex gap-1 justify-between items-center">
                  <h3
                    className={clsx("", {
                      ["text-todo-title"]: taskGroup.status === "Todo",
                      ["text-doing-title"]: taskGroup.status === "Doing",
                      ["text-done-title"]: taskGroup.status === "Done",
                    })}
                  >
                    {taskGroup.status}
                  </h3>
                  {taskGroup.status === "Doing" && (
                    <img
                      src={handIcon}
                      width={20}
                      height={20}
                      alt="flexed biceps"
                    />
                  )}
                  {taskGroup.status === "Done" && (
                    <img
                      src={celebrateIcon}
                      width={20}
                      height={20}
                      alt="party popper"
                    />
                  )}
                </div>
                <p
                  className={clsx("text-sm font-medium", {
                    ["text-todo-taskNumber"]: taskGroup.status === "Todo",
                    ["text-doing-taskNumber"]: taskGroup.status === "Doing",
                    ["text-done-taskNumber"]: taskGroup.status === "Done",
                  })}
                >
                  {taskGroup?.tasks?.length} Task
                  {taskGroup?.tasks?.length > 1 && "s"}
                </p>
              </div>
              <TasksColumn taskGroup={taskGroup} inputRef={inputRef} />
              {(taskGroup.status === "Todo" ||
                taskGroup.status === "Doing") && (
                <AddNewButton status={taskGroup.status} inputRef={inputRef} />
              )}
            </div>
          );
        })}
      </div>
    </DragDropContext>
  );
}

export default TasksCategories;
