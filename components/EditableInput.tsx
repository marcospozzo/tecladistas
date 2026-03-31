"use client";

import { EditableInputProps } from "@/types";
import { ChangeEventHandler, KeyboardEventHandler, useState } from "react";
import { formatPrice, placeholders } from "@/utils/utils";
import Field from "./ui/Field";

export default function EditableInput({
  text = "",
  label,
  fieldName,
  handleOnChange,
  maxLength,
  required = false,
}: EditableInputProps) {
  const [isEditing, setIsEditing] = useState(false);

  function handleOnClick() {
    setIsEditing(!isEditing);
  }

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === "Enter") {
      handleOnClick();
    }
  };

  const handleOnChangeEdit: ChangeEventHandler<HTMLInputElement> = (event) => {
    setIsEditing(true);
    handleOnChange(event);
  };

  return (
    <Field htmlFor={fieldName} label={`${label}:`} required={required}>
      {isEditing || text === "" ? (
        <input
          autoFocus={text !== ""}
          className="ui-input"
          defaultValue={text}
          id={fieldName}
          maxLength={maxLength}
          name={fieldName}
          onBlur={handleOnClick}
          onChange={handleOnChangeEdit}
          onKeyDown={handleKeyDown}
          placeholder={placeholders[fieldName]}
          required={required}
          type="text"
        />
      ) : (
        <button
          className="ui-editable-display"
          onClick={handleOnClick}
          type="button"
        >
          {fieldName === "price" ? formatPrice(text) : text}
        </button>
      )}
    </Field>
  );
}
