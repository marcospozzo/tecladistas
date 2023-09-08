"use client";

import { EditableInput } from "@/components";
import { ItemProps } from "@/types";
import { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";

const NewItem = () => {
  const [formData, setFormData] = useState<ItemProps>({});

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

  useEffect(() => {
    const handleBeforeUnload = (e: {
      preventDefault: () => void;
      returnValue: string;
    }) => {
      e.preventDefault();
      e.returnValue = ""; // This message will be shown to the user in the confirmation dialog.
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

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

      <div className="flex space-x-4 my-4">
        <label className="text-xl w-1/5 self-center" htmlFor="exchanges">
          Intercambio:
        </label>
        <input
          className="h-5 w-5 self-center"
          type="checkbox"
          id="exchanges"
          name="exchanges"
          onChange={handleCheckboxChange}
        />
        <i className="justify-start self-center">
          Escucho propuestas de intercambio como parte de pago.
        </i>
      </div>

      <input
        type="file"
        id="pictures"
        name="pictures"
        accept="image/*"
        required
      />
      <br />

      <button className="submit-button" type="submit">
        <h3 className="text-xl">Publicar</h3>
      </button>
    </form>
  );
};

export default NewItem;
