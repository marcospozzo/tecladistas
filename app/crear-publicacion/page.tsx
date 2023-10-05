"use client";

import { EditableInput } from "@/components";
import { ProductProps } from "@/types";
import { cookieName, placeholders } from "@/utils/utils";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  ChangeEvent,
  ChangeEventHandler,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import { FileUploader } from "react-drag-drop-files";
import { toast } from "react-toastify";

const NewProduct = () => {
  const router = useRouter();
  const [data, setData] = useState<ProductProps>({});
  const [image, setImage] = useState(null);
  const imageTypes = ["JPG", "JPEG", "PNG"];

  const handleEditableInputChange: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (event.target) {
      setData({
        ...data,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target) {
      setData({
        ...data,
        [event.target.name]: event.target.checked,
      });
    }
  };

  const handleTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (event.target) {
      setData({
        ...data,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleImageUploaderChange = (image: SetStateAction<null>) => {
    setImage(image);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        formData.append(key, data[key]);
      }
    }

    formData.append("image", image!);

    try {
      const promise = axios.post(`/api/products/create`, formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      toast.promise(promise, {
        pending: "Publicando...",
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
    <>
      <h1 className="form-title">Crear publicación</h1>

      <form className="wide-form" onSubmit={handleSubmit}>
        <EditableInput
          handleOnChange={handleEditableInputChange}
          label="Título"
          fieldName="title"
          text={data.title}
        />
        <EditableInput
          handleOnChange={handleEditableInputChange}
          label="Marca"
          fieldName="brand"
          text={data.brand}
        />

        <EditableInput
          handleOnChange={handleEditableInputChange}
          label="Modelo"
          fieldName="model"
          text={data.model}
        />

        <EditableInput
          handleOnChange={handleEditableInputChange}
          label="Año"
          fieldName="year"
          text={data.year}
        />

        <div className="flex max-sm:flex-col max-sm:w-full">
          <label className="text-xl self-center max-sm:self-start w-1/5">
            {"Descripción:"}
          </label>

          <textarea
            className="h-24 min-h-[6rem] max-h-96 sm:w-4/5"
            id="description"
            name="description"
            placeholder={placeholders.description}
            onChange={handleTextAreaChange}
            required
          ></textarea>
        </div>

        <EditableInput
          handleOnChange={handleEditableInputChange}
          label="Precio"
          fieldName="price"
          text={data.price}
        />

        <EditableInput
          handleOnChange={handleEditableInputChange}
          label="Ubicación"
          fieldName="location"
          text={data.location}
        />

        <div className="flex max-sm:flex-col space-x-2 my-4">
          <label
            className="text-xl w-1/5 self-center max-sm:self-start "
            htmlFor="exchanges"
          >
            Intercambio:
          </label>
          <div className="flex space-x-2">
            <input
              className="h-5 w-5 m-0 self-center"
              type="checkbox"
              id="exchanges"
              name="exchanges"
              onChange={handleCheckboxChange}
            />
            <h3 className="self-center">{placeholders.exchanges}</h3>
          </div>
        </div>

        <div className="flex max-sm:flex-col space-x-2 my-4">
          <label
            className="text-xl w-1/5 self-center max-sm:self-start "
            htmlFor="exchanges"
          >
            Foto:
          </label>
          <FileUploader
            maxSize={5}
            required
            label={placeholders.image}
            hoverTitle=""
            classes="self-center space-x-4 w-full h-12"
            handleChange={handleImageUploaderChange}
            name="image"
            types={imageTypes}
          />
        </div>

        <div className="flex max-sm:flex-col space-x-2 my-4 justify-center">
          <div className="flex space-x-2">
            <input
              className="h-5 w-5 m-0 self-center"
              type="checkbox"
              id="disclaimer"
              name="disclaimer"
              onChange={handleCheckboxChange}
              required={true}
            />
            <h3 className="self-center">{placeholders.disclamer}</h3>
          </div>
        </div>

        <button className="submit-button my-6 form-button" type="submit">
          <h3 className="text-xl">Publicar</h3>
        </button>
      </form>
    </>
  );
};

export default NewProduct;
