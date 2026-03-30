"use client";

import { Button } from "./ui/Button";
import { constants } from "@/utils/utils";
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
      router.push(constants.INSTRUMENTS_PATH);
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {!isConfirmed && (
        <button
          className="ui-button ui-button-danger w-full"
          onClick={handleDelete}
          type="button"
        >
          Eliminar
        </button>
      )}
      {isConfirmed && (
        <Button onClick={handleConfirm} type="button" variant="primary">
          Confirmar eliminación
        </Button>
      )}
    </div>
  );
};

export default DeleteProductButton;
