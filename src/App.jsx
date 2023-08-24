import React from "react";
import TasksCategories from "./components/tasksStatusCard/tasksCategories";
import checkIcon from "../public/icons/check.png";
const App = () => {
  return (
    <div className="py-[70px] px-[120px] font-inter">
      <div className="flex gap-2 items-center mb-[15px]">
        <img src={checkIcon} width={32} height={32} alt="check" />
        <h1>Task List</h1>
      </div>
      <h5>Break your life to simple tasks to get things done!</h5>
      <h5 className="mb-[46px]">
        Does not matter how many tasks you done, It’s important to break to
        small tasks and be on progress.
      </h5>
      <TasksCategories />
    </div>
  );
};

export default App;
