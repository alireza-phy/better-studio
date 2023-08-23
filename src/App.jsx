import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import clsx from "clsx";

const App = () => {
  const initialData = {
    tasks: {
      "task-1": { id: "task-1", content: "Task 1" },
      "task-2": { id: "task-2", content: "Task 2" },
      "task-3": { id: "task-3", content: "Task 3" },
      "task-4": { id: "task-4", content: "Task 4" },
    },
    columns: {
      "column-1": {
        id: "column-1",
        title: "To do",
        taskIds: ["task-1", "task-2", "task-3", "task-4"],
      },
      "column-2": {
        id: "column-2",
        title: "Doing",
        taskIds: [],
      },
      "column-3": {
        id: "column-3",
        title: "Done",
        taskIds: [],
      },
    },
    columnOrder: ["column-1", "column-2", "column-3"],
  };

  const [data, setData] = useState(initialData);

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "column") {
      const newColumnOrder = Array.from(data.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      setData({ ...data, columnOrder: newColumnOrder });
      return;
    }

    const startColumn = data.columns[source.droppableId];
    const endColumn = data.columns[destination.droppableId];

    if (startColumn === endColumn) {
      const newTaskIds = Array.from(startColumn.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...startColumn,
        taskIds: newTaskIds,
      };

      setData({
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        },
      });
    } else {
      const startTaskIds = Array.from(startColumn.taskIds);
      startTaskIds.splice(source.index, 1);
      const newStartColumn = {
        ...startColumn,
        taskIds: startTaskIds,
      };

      const endTaskIds = Array.from(endColumn.taskIds);
      endTaskIds.splice(destination.index, 0, draggableId);
      const newEndColumn = {
        ...endColumn,
        taskIds: endTaskIds,
      };

      setData({
        ...data,
        columns: {
          ...data.columns,
          [newStartColumn.id]: newStartColumn,
          [newEndColumn.id]: newEndColumn,
        },
      });
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
          {data.columnOrder.map((columnId) => {
            const column = data.columns[columnId];
            const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);
            console.log(column.title);
            return (
              <div
                key={column.id}
                className={clsx(
                  "w-full h-full min-h-[40vh] rounded-md p-4",
                  {
                    ["bg-todo-bg"]: column.title === "To do",
                    ["bg-doing-bg"]: column.title === "Doing",
                    ["bg-done-bg"]: column.title === "Done",
                  }
                )}
              >
                <h2 className="text-lg font-semibold mb-2">{column.title}</h2>
                <Droppable droppableId={column.id}>
                  {(provided) => (
                    <div
                      className="bg-gray-100 p-2 rounded"
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {tasks.map((task, index) => (
                        <Draggable
                          key={task.id}
                          draggableId={task.id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                            className={clsx(
                                "p-2 mb-2 shadow rounded cursor-pointer",
                                {
                                  ["bg-doing-bg"]: column.title === "To do",
                                  ["bg-todo-bg"]: column.title === "Doing",
                                  ["bg-done-bg"]: column.title === "Done",
                                }
                              )}
                            //   className="bg-todo-bg p-2 mb-2 shadow rounded cursor-pointer"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              {task.content}
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
