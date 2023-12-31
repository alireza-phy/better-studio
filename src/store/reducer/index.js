// introduce initial state
export const initialState = {
  tasks: localStorage.getItem("tasks")
    ? JSON.parse(localStorage.getItem("tasks"))
    : [
        {
          status: "Todo",
          tasks: [
            {
              id: "1",
              content:
                "Start with meditation, exercise & breakfast for a productive day",
              checked: false,
            },
            {
              id: "2",
              content: "Read to learn something new every day",
              checked: false,
            },
            {
              id: "3",
              content: "Learn something fresh & relevant",
              checked: false,
            },
          ],
        },
        {
          status: "Doing",
          tasks: [
            {
              id: "4",
              content: "Engage & question in meetings",
              checked: false,
            },
            {
              id: "5",
              content: "Use time-blocking for effective days",
              checked: false,
            },
          ],
        },
        {
          status: "Done",
          tasks: [
            {
              id: "6",
              content: "Finished online course - check!",
              checked: true,
            },
            {
              id: "7",
              content:
                "Congratulate yourself for incorporating healthier habits into your lifestyle, like regular exercise or mindful eating",
              checked: true,
            },
          ],
        },
      ],
};

// Define reducer function
export const reducer = (state = initialState, action) => {
  // Destructure action object
  const { type, data } = action;

  // Perform different actions based on the provided 'type'
  switch (type) {
    case "delete-task":
      // Logic for deleting a task
      const newTasksDeletedOne = state?.tasks?.map((taskGroup) =>
        taskGroup?.status === data?.status
          ? {
              status: data?.status,
              tasks: taskGroup?.tasks?.filter((task) => task?.id !== data?.id),
            }
          : taskGroup
      );
      localStorage.setItem("tasks", JSON.stringify(newTasksDeletedOne));
      return {
        tasks: [...newTasksDeletedOne],
      };
    case "create-task":
      // Logic for creating a new task
      const newTasksAddedNew = state?.tasks?.map((taskGroup) =>
        taskGroup?.status === data?.status
          ? {
              status: data?.status,
              tasks: [
                ...taskGroup?.tasks,
                {
                  id: data?.id,
                  content: "",
                  checked: false,
                },
              ],
            }
          : taskGroup
      );
      localStorage.setItem("tasks", JSON.stringify(newTasksAddedNew));
      return {
        tasks: [...newTasksAddedNew],
      };
    case "edit-task":
      // Logic for editing a task
      const newTasksEditedOne = state?.tasks?.map((taskGroup) =>
        taskGroup?.status === data?.status
          ? {
              status: data?.status,
              tasks: taskGroup?.tasks?.map((task) =>
                task?.id === data?.id
                  ? {
                      id: task?.id,
                      content: data?.value,
                      checked: task?.checked,
                    }
                  : task
              ),
            }
          : taskGroup
      );
      localStorage.setItem("tasks", JSON.stringify(newTasksEditedOne));
      return {
        tasks: [...newTasksEditedOne],
      };
    case "change-task-check":
      // Logic for changing checkbox condition of a task
      const newTaskCheckedChanged = state?.tasks?.map((taskGroup) =>
        taskGroup?.status === data?.status
          ? {
              status: data?.status,
              tasks: taskGroup?.tasks?.map((task) =>
                task?.id === data?.id
                  ? {
                      id: task?.id,
                      content: task?.content,
                      checked: !task?.checked,
                    }
                  : task
              ),
            }
          : taskGroup
      );
      localStorage.setItem("tasks", JSON.stringify(newTaskCheckedChanged));
      return {
        tasks: [...newTaskCheckedChanged],
      };
    case "change-task-status":
      // Logic for changing status of a task (todo | doing | done)
      const newTaskStatusChanged = [...state?.tasks];

      const originIndex = newTaskStatusChanged.findIndex(
        (tasksGroup) => tasksGroup.status === data?.status
      );
      const destinationIndex = newTaskStatusChanged.findIndex(
        (tasksGroup) =>
          tasksGroup.status === (data?.status === "Done" ? "Todo" : "Done")
      );

      if (originIndex !== -1 && destinationIndex !== -1) {
        const taskToMove = newTaskStatusChanged[originIndex].tasks.find(
          (task) => task.id === data?.id
        );
        if (taskToMove) {
          newTaskStatusChanged[originIndex].tasks = newTaskStatusChanged[
            originIndex
          ].tasks.filter((task) => task.id !== data?.id);
          newTaskStatusChanged[destinationIndex].tasks.unshift({
            ...taskToMove,
            checked: data?.status !== "Done" ? true : false,
          });
        }
      }
      localStorage.setItem("tasks", JSON.stringify(newTaskStatusChanged));
      return {
        tasks: [...newTaskStatusChanged],
      };
    case "reorder-task-in-column":
      // Logic for changing position of a task in a column
      const columnIdx = state?.tasks.findIndex(
        (column) => column.status === data.droppableId
      );
      const column = state?.tasks[columnIdx];
      const updatedTasks = [...column.tasks];
      const [reorderedTask] = updatedTasks.splice(data.srcIndex, 1);
      updatedTasks.splice(data.destIndex, 0, reorderedTask);

      const updatedColumn = {
        ...column,
        tasks: updatedTasks,
      };

      const reorderedTasks = state?.tasks.map((col, idx) => {
        if (idx === columnIdx) {
          return updatedColumn;
        }
        return col;
      });
      localStorage.setItem("tasks", JSON.stringify(reorderedTasks));
      return {
        tasks: [...reorderedTasks],
      };
    case "move-task-between-column":
      // Logic for changing position of a task in between two column
      const sourceColumnIdx = state?.tasks.findIndex(
        (column) => column.status === data.srcDroppableId
      );
      const destColumnIdx = state?.tasks.findIndex(
        (column) => column.status === data.destDroppableId
      );

      const sourceColumn = state?.tasks[sourceColumnIdx];
      const destColumn = state?.tasks[destColumnIdx];

      const updatedSourceTasks = [...sourceColumn.tasks];
      const updatedDestTasks = [...destColumn.tasks];
      let [movedTask] = updatedSourceTasks.splice(data.srcIndex, 1);

      if (destColumn?.status === "Done") {
        movedTask = { ...movedTask, checked: true };
      } else if (sourceColumn?.status === "Done") {
        movedTask = { ...movedTask, checked: false };
      }
      updatedDestTasks.splice(data.destIndex, 0, movedTask);

      const updatedSourceColumn = {
        ...sourceColumn,
        tasks: updatedSourceTasks,
      };

      const updatedDestColumn = {
        ...destColumn,
        tasks: updatedDestTasks,
      };

      const updatedReorderedTasks = state?.tasks.map((column, idx) => {
        if (idx === sourceColumnIdx) {
          return updatedSourceColumn;
        }
        if (idx === destColumnIdx) {
          return updatedDestColumn;
        }
        return column;
      });
      localStorage.setItem("tasks", JSON.stringify(updatedReorderedTasks));
      return {
        tasks: [...updatedReorderedTasks],
      };

    default:
      return state;
  }
};
