import React from "react";
import redDeleteIcon from "../../../public/icons/icons8-multiply-26-red.png";
import blueDeleteIcon from "../../../public/icons/icons8-multiply-26-blue.png";
import orangeDeleteIcon from "../../../public/icons/icons8-multiply-26-orange.png";

function DeleteIcon({ handleDelete, ...props }) {
  const { status } = props;
  return (
    <img
      onClick={() => handleDelete(props)}
      src={
        status === "Todo"
          ? redDeleteIcon
          : status === "Doing"
          ? orangeDeleteIcon
          : blueDeleteIcon
      }
      width={16}
      height={16}
      className="opacity-0 transition-opacity hover:opacity-100 hover:cursor-pointer"
      alt="delete"
    />
  );
}

export default DeleteIcon;
