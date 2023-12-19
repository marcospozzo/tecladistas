"use client";

import { MouseEventHandler } from "react";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa6";

const CustomThumb = ({
  type,
  isPressed,
}: //   handleOnClick,
{
  type: "up" | "down";
  isPressed: boolean;
  //   handleOnClick: MouseEventHandler<HTMLButtonElement>;
}) => {
  const handleOnClick = () => {
    console.log("clicked");
  };
  const size = 30;
  const children =
    type === "up" ? <FaThumbsUp size={size} /> : <FaThumbsDown size={size} />;
  return (
    <button
      className={`custom-thumb ${isPressed && "is-pressed"} `}
      onClick={handleOnClick}
    >
      {children}
    </button>
  );
};

export default CustomThumb;
