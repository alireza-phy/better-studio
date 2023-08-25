import React from "react";
import clsx from "clsx";

function Checkbox({ checked, handleCheckBoxClick, ...props }) {
  const { status } = props;
  return (
    <div className="inline-flex items-center">
      <label className="relative flex cursor-pointer items-center rounded-full p-0">
        <input
          type="checkbox"
          className={clsx(
            "before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-xs border transition-all",
            {
              ["border-todo-taskSquareBorder"]: status === "Todo",
              ["border-doing-taskSquareBorder"]: status === "Doing",
              ["line-through border-done-taskSquareBorder"]: status === "Done",
            }
          )}
          checked={checked}
          onChange={() => handleCheckBoxClick(props)}
        />
        <div
          className={clsx(
            "pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 opacity-0 transition-opacity peer-checked:opacity-100",
            {
              ["text-todo-taskNew"]: status === "Todo",
              ["text-doing-taskNew"]: status === "Doing",
              ["text-done-taskNew"]: status === "Done",
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
  );
}

export default Checkbox;
