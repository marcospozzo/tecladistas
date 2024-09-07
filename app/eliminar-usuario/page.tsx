"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { toast } from "react-toastify";

const DeleteWhitelisted = () => {
  const router = useRouter();
  const [data, setData] = useState({
    phone: "",
  });

  function handlePhoneChange(value: string | undefined) {
    setData({
      ...data,
      phone: value ?? "",
    });
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("phone", data.phone);

    try {
      const promise = axios.post("/api/users/delete-whitelisted", formData);

      toast.promise(promise, {
        pending: "Eliminando...",
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
      <h1 className="form-title">Eliminar usuario</h1>
      <form onSubmit={handleSubmit} className="login-signup">
        <PhoneInput
          className="pl-4 gap-x-2 w-full"
          id="phone"
          name="phone"
          international
          countryCallingCodeEditable={false}
          defaultCountry="AR"
          value={"+549"}
          onChange={handlePhoneChange}
        />
        <br />
        <div className="flex flex-col justify-center space-y-2">
          <button className="submit-button" type="submit" value="login">
            <h3>Eliminar usuario</h3>
          </button>
        </div>
      </form>
    </>
  );
};

export default DeleteWhitelisted;
