import React, { useContext } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import clsx from "clsx";
import { TodoListContext } from "../../store/context";
import Checkbox from "./checkbox";
import TaskContent from "./taskContent";
import DeleteIcon from "./deleteIcon";

function TasksColumn({ taskGroup, inputRef }) {
  const { dispatch } = useContext(TodoListContext);

  const handleDeleteTask = (props) => {
    const { id, status } = props;
    dispatch({ type: "delete-task", data: { status, id } });
  };

  const handleCheckBoxClick = (props) => {
    const { status, id } = props;
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
  console.log(taskGroup);
  return (
    <Droppable droppableId={taskGroup.status}>
      {(provided) => (
        <div
          className="py-5"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {taskGroup?.tasks.map((task, index) => (
            <Draggable key={task.id} draggableId={task.id} index={index}>
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
                  <Checkbox
                    id={task.id}
                    checked={task.checked}
                    status={taskGroup.status}
                    handleCheckBoxClick={handleCheckBoxClick}
                  />
                  <TaskContent
                    id={task.id}
                    inputRef={inputRef}
                    content={task.content}
                    status={taskGroup.status}
                    handleChangeText={handleChangeText}
                  />
                  <DeleteIcon
                    id={task.id}
                    status={taskGroup.status}
                    handleDelete={handleDeleteTask}
                  />
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

export default TasksColumn;
