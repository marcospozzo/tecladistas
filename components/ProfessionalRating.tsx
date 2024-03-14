"use client";

import { Rating } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const ProfessionalRating = ({
  id,
  value,
}: {
  id: string;
  value: number | undefined | null;
}) => {
  const router = useRouter();
  const [ratingValue, setRatingValue] = useState<number | undefined | null>(
    value
  );
  return (
    <div className="flex flex-col space-y-3">
      <h2 className="self-center mt-4">Calificar:</h2>
      <div className="flex justify-center">
        <Rating
          value={ratingValue}
          onChange={async (_event, rate) => {
            try {
              const promise = axios.post(
                `/api/professionals/rate/${id}/${rate}`
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
              setRatingValue(rate);
              router.refresh();
            } catch (error) {
              console.error(error);
            }
          }}
        />
      </div>
    </div>
  );
};

export default ProfessionalRating;
