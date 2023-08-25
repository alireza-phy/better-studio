import React from "react";
import TasksCategories from "./components/tasksCategories";
import checkIcon from "../public/icons/check.png";

const App = () => {
  return (
    <div className="py-[70px] px-8 sm:px-12 lg:px-[120px] font-inter">
      {/* Header */}
      <div className="flex gap-2 items-center mb-[15px]">
        <img src={checkIcon} width={32} height={32} alt="check" />
        <h1>Task List</h1>
      </div>

      {/* Subtitle */}
      <h5>Break your life into simple tasks to get things done!</h5>

      {/* Explanation */}
      <h5 className="mb-[46px]">
        Doesn't matter how many tasks you've done, it's important to break them
        into small tasks and make progress.
      </h5>

      {/* Displaying Task Categories */}
      <TasksCategories />
    </div>
  );
};

export default App;
