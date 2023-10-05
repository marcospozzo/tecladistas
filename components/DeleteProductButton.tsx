"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const DeleteProductButton = ({ id }: { id: string | undefined }) => {
  const router = useRouter();
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleDelete = () => {
    setIsConfirmed(true);
  };

  const handleConfirm = async () => {
    try {
      const promise = axios.delete(`/api/products/${id}`);
      toast.promise(promise, {
        pending: "Eliminando...",
        error: {
          render({
            data,
          }: {
            data?: { response?: { data?: { error?: string } } };
          }) {
            console.log({ data });
            return data?.response?.data?.error ?? "Error";
          },
        },
      });
      await promise;
      router.push("/teclados");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col text-lg space-x-1">
      {!isConfirmed && (
        <button
          className="flex justify-center delete-button space-x-2 my-2"
          onClick={handleDelete}
        >
          <h3 className="text-base">Borrar publicación</h3>
        </button>
      )}
      {isConfirmed && (
        <button
          className="flex justify-center submit-button space-x-2 my-2 w-fit self-center"
          onClick={handleConfirm}
        >
          <h3 className="text-base">Confirmar</h3>
        </button>
      )}
    </div>
  );
};

export default DeleteProductButton;
