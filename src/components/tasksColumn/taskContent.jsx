import React from "react";

function TaskContent({ content, inputRef, handleChangeText, ...props }) {
    // Define the task textarea component
  const { id, status } = props;

  return (
    <textarea
      className="appearance-none border-none w-full py-2 px-3 text-fontPrimary leading-tight focus:outline-none focus:shadow-none"
      placeholder="write something..."
      id={id}
      type="text"
      autoFocus={id === inputRef.current}
      style={{ height: "auto", resize: "none" }}
      rows={Math.max(Math.ceil(content.length / 20), 1)}
      value={content}
      onChange={(e) => handleChangeText(e, id, status)}
    />
  );
}

export default TaskContent;
