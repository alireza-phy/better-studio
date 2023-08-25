import React, { memo, useContext } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import clsx from "clsx";
import { TodoListContext } from "../../store/context";
import Checkbox from "./checkbox";
import TaskContent from "./taskContent";
import DeleteIcon from "./deleteIcon";

function TasksColumn({ taskGroup, inputRef }) {
  // Define the TasksColumn component
  const { dispatch } = useContext(TodoListContext); // Get the dispatch function from TodoListContext

  const handleDeleteTask = (props) => {
    // Function to handle task deletion
    const { id, status } = props;
    dispatch({ type: "delete-task", data: { status, id } }); // Dispatch delete-task action
  };

  const handleCheckBoxClick = (props) => {
    // Function to handle checkbox click
    const { status, id } = props;
    dispatch({ type: "change-task-check", data: { status, id } }); // Dispatch change-task-check action

    let debounceTimer;
    {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        dispatch({ type: "change-task-status", data: { status, id } }); // Dispatch change-task-status action after a delay
      }, 3000);
    }
  };

  const handleChangeText = (e, id, status) => {
    // Function to handle text change
    const newValue = e?.target?.value?.split("\n");
    console.log(newValue);
    dispatch({
      type: "edit-task",
      data: { status, id, value: newValue[0] },
    }); // Dispatch edit-task action for the initial value

    if (newValue.length > 1) {
      newValue.shift();
      newValue.map((value) => {
        const id = (Math.floor(Math.random() * 10000) + 10).toString();
        dispatch({ type: "create-task", data: { id, status } }); // Dispatch create-task action for each additional value
        dispatch({
          type: "edit-task",
          data: { status, id, value: value },
        }); // Dispatch edit-task action for each additional value
      });
    }
  };

  const MemoizedCheckBox = memo(
    (data) => {
      const { task, taskGroup } = data;
      return (
        <Checkbox
          id={task.id}
          checked={task.checked}
          status={taskGroup.status}
          handleCheckBoxClick={handleCheckBoxClick}
        />
      );
    },
    (prev, next) => {
      return (
        prev.task.checked === next.task.checked &&
        prev.taskGroup.status === next.taskGroup.status
      );
    }
  );

  const MemoizedDeleteIcon = memo(
    (data) => {
      const { task, taskGroup } = data;
      return (
        <DeleteIcon
          id={task.id}
          status={taskGroup.status}
          handleDelete={handleDeleteTask}
        />
      );
    },
    () => {
      return true;
    }
  );

  return (
    <Droppable droppableId={taskGroup?.status}>
      {(dropProvided) => (
        <div ref={dropProvided.innerRef} className="py-5">
          {taskGroup?.tasks.map((task, index) => (
            <Draggable key={task.id} draggableId={task.id} index={index}>
              {(dragProvided) => (
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
                  ref={dragProvided.innerRef}
                  {...dragProvided.draggableProps}
                  {...dragProvided.dragHandleProps}
                >
                  <MemoizedCheckBox task={task} taskGroup={taskGroup} />
                  <TaskContent
                    id={task.id}
                    inputRef={inputRef}
                    content={task.content}
                    status={taskGroup.status}
                    handleChangeText={handleChangeText}
                  />
                  <MemoizedDeleteIcon task={task} taskGroup={taskGroup} />
                </div>
              )}
            </Draggable>
          ))}
          {dropProvided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

export default TasksColumn;
