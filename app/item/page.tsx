"use client";

import { EditableInput } from "@/components";
import { ItemProps } from "@/types";
import { placeholders } from "@/utils/utils";
import {
  ChangeEvent,
  ChangeEventHandler,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { FileUploader } from "react-drag-drop-files";
const fileTypes = ["JPG", "JPEG", "PNG"];

const NewItem = () => {
  const [formData, setFormData] = useState<ItemProps>({});
  const [file, setFile] = useState(null);

  const handleEditableInputChange: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (event.target) {
      setFormData({
        ...formData,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target) {
      setFormData({
        ...formData,
        [event.target.name]: event.target.checked,
      });
    }
  };

  const handleFileUploaderChange = (file: SetStateAction<null>) => {
    setFile(file);
  };

  return (
    <form action="#" method="post">
      <h1 className="form-title">Crear publicación</h1>

      <EditableInput
        handleOnChange={handleEditableInputChange}
        label="Título"
        fieldName="title"
        text={formData.title}
      />
      <EditableInput
        handleOnChange={handleEditableInputChange}
        label="Marca"
        fieldName="brand"
        text={formData.brand}
      />

      <EditableInput
        handleOnChange={handleEditableInputChange}
        label="Modelo"
        fieldName="model"
        text={formData.model}
      />

      <EditableInput
        handleOnChange={handleEditableInputChange}
        label="Año"
        fieldName="year"
        text={formData.year}
      />

      <EditableInput
        handleOnChange={handleEditableInputChange}
        label="Descripción"
        fieldName="description"
        text={formData.description}
      />

      <EditableInput
        handleOnChange={handleEditableInputChange}
        label="Precio"
        fieldName="price"
        text={formData.price}
      />

      <EditableInput
        handleOnChange={handleEditableInputChange}
        label="Ubicación"
        fieldName="location"
        text={formData.location}
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
          maxSize={2}
          required
          label={placeholders.picture}
          hoverTitle=""
          classes="self-center space-x-4 w-full h-12"
          handleChange={handleFileUploaderChange}
          name="file"
          types={fileTypes}
        />
      </div>

      <div className="flex max-sm:flex-col space-x-2 my-4 justify-center">
        <div className="flex space-x-2">
          <input
            className="h-5 w-5 m-0 self-center"
            type="checkbox"
            id="disclamer"
            name="disclamer"
            onChange={handleCheckboxChange}
            required={true}
          />
          <h3 className="self-center">{placeholders.disclamer}</h3>
        </div>
      </div>

      <button className="submit-button my-6" type="submit">
        <h3 className="text-xl">Publicar</h3>
      </button>
    </form>
  );
};

export default NewItem;
