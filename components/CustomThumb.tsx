"use client";

import axios from "axios";
import { useState } from "react";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa6";
import { toast } from "react-toastify";

const CustomThumb = async ({
  type,
  isRated,
  professionalId,
}: {
  type: "up" | "down";
  isRated: boolean | undefined;
  professionalId: string | undefined;
}) => {
  const [isPressed, setIsPressed] = useState(isRated);

  const handleOnClick = async () => {
    try {
      const promise = axios.post(
        `/api/professionals/${
          type === "up" ? "rate-up" : "rate-down"
        }/${professionalId}`
      );
      toast.promise(promise, {
        pending: "Calificando...",
        success: "Calificado",
        error: {
          render({
            data,
          }: {
            data?: { response?: { data?: { error?: string } } };
          }) {
            return data?.response?.data?.error ?? "Error";
          },
        },
      });
      await promise;
      setIsPressed(!isPressed);
    } catch (error) {
      console.error(error);
    }
  };
  const size = 30;
  const thumb =
    type === "up" ? <FaThumbsUp size={size} /> : <FaThumbsDown size={size} />;
  return (
    <button
      className={`custom-thumb ${isPressed && "is-pressed"} `}
      onClick={handleOnClick}
    >
      {thumb}
    </button>
  );
};

export default CustomThumb;
