"use client";
import { INSTRUMENTS_PATH } from "@/utils/constants";
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
            return data?.response?.data?.error ?? "Error";
          },
        },
      });
      await promise;
      router.push(INSTRUMENTS_PATH);
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col space-x-1">
      {!isConfirmed && (
        <button
          className="flex justify-center delete-button space-x-2 w-full"
          onClick={handleDelete}
        >
          <h3>Eliminar</h3>
        </button>
      )}
      {isConfirmed && (
        <button
          className="flex justify-center submit-button space-x-2 w-fit"
          onClick={handleConfirm}
        >
          <h3>Confirmar eliminación</h3>
        </button>
      )}
    </div>
  );
};

export default DeleteProductButton;
