"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const CreateWhitelisted = () => {
  const router = useRouter();
  const [data, setData] = useState({
    displayName: "",
    phone: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target) {
      setData({
        ...data,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("displayName", data.displayName);
    formData.append("phone", data.phone);

    try {
      const promise = axios.post("/api/users/create-whitelisted", formData);

      toast.promise(promise, {
        pending: "Creando...",
        success: {
          render({ data }: { data?: { data?: { success?: string } } }) {
            setTimeout(() => {
              router.push("/");
            }, 1000);
            return data?.data?.success || "Test";
          },
        },
        error: {
          render({
            data,
          }: {
            data?: { response?: { data?: { error?: string } } };
          }) {
            return data?.response?.data?.error || "Error";
          },
        },
      });
      await promise;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1 className="form-title">Crear usuario</h1>
      <form onSubmit={handleSubmit} className="login-signup">
        <input
          type="text"
          id="displayName"
          name="displayName"
          placeholder="Nombre"
          onChange={handleChange}
        />
        <input
          type="text"
          id="phone"
          name="phone"
          placeholder="Celular (formato: 5491122334455)"
          onChange={handleChange}
          required
        />
        <br />
        <div className="flex flex-col justify-center space-y-2">
          <button
            className="submit-button form-button"
            type="submit"
            value="login"
          >
            <h3 className="text-xl">Crear usuario</h3>
          </button>
        </div>
      </form>
    </>
  );
};

export default CreateWhitelisted;
