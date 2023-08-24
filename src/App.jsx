import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import clsx from "clsx";
import handIcon from "../public/icons/icons8-flexed-biceps-48.png";
import celebrateIcon from "../public/icons/icons8-party-popper-48.png";
import redDeleteIcon from "../public/icons/icons8-multiply-26-red.png";
import blueDeleteIcon from "../public/icons/icons8-multiply-26-blue.png";
import orangeDeleteIcon from "../public/icons/icons8-multiply-26-orange.png";

const App = () => {
  const initialData = [
    {
      status: "Todo",
      tasks: [
        {
          id: "task-1",
          content:
            "Start with meditation, exercise & breakfast for a productive day",
          checked: false,
        },
        {
          id: "task-2",
          content: "Read to learn something new every day",
          checked: false,
        },
        {
          id: "task-3",
          content: "Learn something fresh & relevant",
          checked: false,
        },
      ],
    },
    {
      status: "Doing",
      tasks: [
        {
          id: "task-4",
          content: "Engage & question in meetings",
          checked: false,
        },
        {
          id: "task-5",
          content: "Use time-blocking for effective days",
          checked: false,
        },
      ],
    },
    {
      status: "Done",
      tasks: [
        {
          id: "task-6",
          content: "Finished online course - check!",
          checked: true,
        },
        {
          id: "task-7",
          content:
            "Congratulate yourself for incorporating healthier habits into your lifestyle, like regular exercise or mindful eating",
          checked: true,
        },
      ],
    },
  ];

  const [data, setData] = useState(initialData);
  let debounceTimer;

  const handleDeleteTask = (id, status) => {
    setData((data) =>
      data?.map((taskGroup) =>
        taskGroup?.status === status
          ? {
              status: status,
              tasks: taskGroup?.tasks?.filter((task) => task?.id !== id),
            }
          : taskGroup
      )
    );
  };

  const handleCheckBoxClick = (id, status) => {
    setData((data) =>
      data?.map((taskGroup) =>
        taskGroup?.status === status
          ? {
              status: status,
              tasks: taskGroup?.tasks?.map((task) =>
                task?.id === id
                  ? {
                      id: task?.id,
                      content: task?.content,
                      checked: !task?.checked,
                    }
                  : task
              ),
            }
          : taskGroup
      )
    );
    {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        switch (status) {
          case "Todo":
            setData((prevData) => {
              const newData = [...prevData];

              const todoIndex = newData.findIndex(
                (column) => column.status === "Todo"
              );
              const doingIndex = newData.findIndex(
                (column) => column.status === "Done"
              );

              if (todoIndex !== -1 && doingIndex !== -1) {
                const taskToMove = newData[todoIndex].tasks.find(
                  (task) => task.id === id
                );

                if (taskToMove) {
                  newData[todoIndex].tasks = newData[todoIndex].tasks.filter(
                    (task) => task.id !== id
                  );
                  newData[doingIndex].tasks.unshift({
                    ...taskToMove,
                    checked: true,
                  });
                }
              }

              return newData;
            });
            break;
          case "Doing":
            setData((prevData) => {
              const newData = [...prevData];

              const todoIndex = newData.findIndex(
                (column) => column.status === "Doing"
              );
              const doingIndex = newData.findIndex(
                (column) => column.status === "Done"
              );

              if (todoIndex !== -1 && doingIndex !== -1) {
                const taskToMove = newData[todoIndex].tasks.find(
                  (task) => task.id === id
                );

                if (taskToMove) {
                  newData[todoIndex].tasks = newData[todoIndex].tasks.filter(
                    (task) => task.id !== id
                  );
                  newData[doingIndex].tasks.push({
                    ...taskToMove,
                    checked: true,
                  });
                }
              }

              return newData;
            });
            break;
          case "Done":
            setData((prevData) => {
              const newData = [...prevData];

              const todoIndex = newData.findIndex(
                (column) => column.status === "Done"
              );
              const doingIndex = newData.findIndex(
                (column) => column.status === "Todo"
              );

              if (todoIndex !== -1 && doingIndex !== -1) {
                const taskToMove = newData[todoIndex].tasks.find(
                  (task) => task.id === id
                );

                if (taskToMove) {
                  newData[todoIndex].tasks = newData[todoIndex].tasks.filter(
                    (task) => task.id !== id
                  );
                  newData[doingIndex].tasks.unshift({
                    ...taskToMove,
                    checked: false,
                  });
                }
              }
              return newData;
            });
            break;
          default:
        }
      }, 3000);
    }
  };

  const handleChangeText = (e, id, status) => {
    setData((data) =>
      data?.map((taskGroup) =>
        taskGroup?.status === status
          ? {
              status: status,
              tasks: taskGroup?.tasks?.map((task) =>
                task?.id === id
                  ? {
                      id: task?.id,
                      content: e.target.value,
                      checked: task?.checked,
                    }
                  : task
              ),
            }
          : taskGroup
      )
    );
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
      const columnIdx = data.findIndex(
        (column) => column.status === source.droppableId
      );
      const column = data[columnIdx];
      const updatedTasks = [...column.tasks];
      const [movedTask] = updatedTasks.splice(source.index, 1);
      updatedTasks.splice(destination.index, 0, movedTask);

      const updatedColumn = {
        ...column,
        tasks: updatedTasks,
      };

      const updatedData = data.map((col, idx) => {
        if (idx === columnIdx) {
          return updatedColumn;
        }
        return col;
      });

      setData(updatedData);
    } else {
      // Move between columns
      const sourceColumnIdx = data.findIndex(
        (column) => column.status === source.droppableId
      );
      const destColumnIdx = data.findIndex(
        (column) => column.status === destination.droppableId
      );

      const sourceColumn = data[sourceColumnIdx];
      const destColumn = data[destColumnIdx];

      const updatedSourceTasks = [...sourceColumn.tasks];
      const updatedDestTasks = [...destColumn.tasks];
      let [movedTask] = updatedSourceTasks.splice(source.index, 1);
      console.log(movedTask);
      console.log(sourceColumn);
      console.log(destColumn);
      if (destColumn?.status === "Done") {
        movedTask = { ...movedTask, checked: true };
      } else if (sourceColumn?.status === "Done") {
        movedTask = { ...movedTask, checked: false };
      }
      updatedDestTasks.splice(destination.index, 0, movedTask);

      const updatedSourceColumn = {
        ...sourceColumn,
        tasks: updatedSourceTasks,
      };

      const updatedDestColumn = {
        ...destColumn,
        tasks: updatedDestTasks,
      };

      const updatedData = data.map((column, idx) => {
        if (idx === sourceColumnIdx) {
          return updatedSourceColumn;
        }
        if (idx === destColumnIdx) {
          return updatedDestColumn;
        }
        return column;
      });
      setData(updatedData);
    }
  };

  return (
    <div className="py-[70px] px-[120px] font-inter">
      <h1>Task List</h1>
      <h5>Break your life to simple tasks to get things done!</h5>
      <h5 className="mb-[46px]">
        Does not matter how many tasks you done, It’s important to break to
        small tasks and be on progress.
      </h5>

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
                      className="py-[23px]"
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
                                id="username"
                                type="text"
                                style={{ height: "auto", resize: "none" }}
                                rows={Math.min(
                                  Math.ceil(task.content.length / 28),
                                  20
                                )}
                                value={task.content}
                                onChange={(e) =>
                                  handleChangeText(
                                    e,
                                    task.id,
                                    taskGroup?.status
                                  )
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
              </div>
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
};

export default App;
