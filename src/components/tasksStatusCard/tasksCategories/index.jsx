import React, { useState, useContext, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import clsx from "clsx";
import handIcon from "../../../../public/icons/icons8-flexed-biceps-48.png";
import celebrateIcon from "../../../../public/icons/icons8-party-popper-48.png";
import redDeleteIcon from "../../../../public/icons/icons8-multiply-26-red.png";
import blueDeleteIcon from "../../../../public/icons/icons8-multiply-26-blue.png";
import orangeDeleteIcon from "../../../../public/icons/icons8-multiply-26-orange.png";
import { TodoListContext } from "../../../store/context";

function TasksCategories() {
  const { state, dispatch } = useContext(TodoListContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(state?.tasks);
  }, [state]);

  const handleAddNewTask = (status) => {
    dispatch({ type: "create-task", data: { status } });
  };

  const handleDeleteTask = (id, status) => {
    dispatch({ type: "delete-task", data: { status, id } });
  };

  const handleCheckBoxClick = (id, status) => {
    dispatch({ type: "change-task-check", data: { status, id } });
    let debounceTimer;
    {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        dispatch({ type: "change-task-status", data: { status, id } });
      }, 3000);
    }
  };

  const handleChangeText = (e, id, status) => {
    dispatch({
      type: "edit-task",
      data: { status, id, value: e?.target?.value },
    });
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
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

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-3 gap-5">
        {data.map((taskGroup) => {
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
              <Droppable droppableId={taskGroup.status}>
                {(provided) => (
                  <div
                    className="py-5"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {taskGroup?.tasks.map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            className={clsx(
                              "bg-white p-2 mb-2 shadow rounded border cursor-pointer rounded-xs flex gap-[10px] items-center",
                              {
                                ["border-todo-taskBoxBorder"]:
                                  taskGroup.status === "Todo",
                                ["border-doing-taskBoxBorder"]:
                                  taskGroup.status === "Doing",
                                ["line-through border-done-taskBoxBorder"]:
                                  taskGroup.status === "Done",
                              }
                            )}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <div className="inline-flex items-center">
                              <label className="relative flex cursor-pointer items-center rounded-full p-0">
                                <input
                                  type="checkbox"
                                  className={clsx(
                                    "before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-xs border transition-all",
                                    {
                                      ["border-todo-taskSquareBorder"]:
                                        taskGroup.status === "Todo",
                                      ["border-doing-taskSquareBorder"]:
                                        taskGroup.status === "Doing",
                                      ["line-through border-done-taskSquareBorder"]:
                                        taskGroup.status === "Done",
                                    }
                                  )}
                                  checked={task.checked}
                                  onClick={() =>
                                    handleCheckBoxClick(
                                      task.id,
                                      taskGroup?.status
                                    )
                                  }
                                />
                                <div
                                  className={clsx(
                                    "pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 opacity-0 transition-opacity peer-checked:opacity-100",
                                    {
                                      ["text-todo-taskNew"]:
                                        taskGroup.status === "Todo",
                                      ["text-doing-taskNew"]:
                                        taskGroup.status === "Doing",
                                      ["text-done-taskNew"]:
                                        taskGroup.status === "Done",
                                    }
                                  )}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-3.5 w-3.5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    stroke="currentColor"
                                    strokeWidth="1"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </div>
                              </label>
                            </div>
                            <textarea
                              className="appearance-none border-none w-full py-2 px-3 text-fontPrimary leading-tight focus:outline-none focus:shadow-none"
                              placeholder="write something..."
                              id="username"
                              type="text"
                              style={{ height: "auto", resize: "none" }}
                              rows={Math.max(
                                Math.ceil(task.content.length / 20),
                                1
                              )}
                              value={task.content}
                              onChange={(e) =>
                                handleChangeText(e, task.id, taskGroup?.status)
                              }
                            />

                            <img
                              onClick={() =>
                                handleDeleteTask(task?.id, taskGroup?.status)
                              }
                              src={
                                taskGroup?.status === "Todo"
                                  ? redDeleteIcon
                                  : taskGroup?.status === "Doing"
                                  ? orangeDeleteIcon
                                  : blueDeleteIcon
                              }
                              width={16}
                              height={16}
                              className="opacity-0 transition-opacity hover:opacity-100 hover:cursor-default"
                              alt="delete"
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              {(taskGroup.status === "Todo" ||
                taskGroup.status === "Doing") && (
                <div
                  onClick={() => handleAddNewTask(taskGroup.status)}
                  className={clsx(
                    "flex gap-[10px] items-center px-[10px] cursor-pointer",
                    {
                      ["text-todo-taskNew"]: taskGroup.status === "Todo",
                      ["text-doing-taskNew"]: taskGroup.status === "Doing",
                    }
                  )}
                >
                  <p className="text-md font-semibold">+</p>
                  <p className="text-md font-semibold">New</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </DragDropContext>
  );
}

export default TasksCategories;
