"use client";

import { EditableInputProps } from "@/types";
import { ChangeEventHandler, KeyboardEventHandler, useState } from "react";
import { formatPrice, placeholders } from "@/utils/utils";

export default function EditableInput({
  text = "",
  label,
  fieldName,
  handleOnChange,
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
    <div className="flex max-sm:flex-col">
      <label className="text-xl self-center max-sm:self-start w-1/5">{`${label}:`}</label>
      {isEditing || text === "" ? (
        <input
          name={fieldName}
          onChange={handleOnChangeEdit}
          defaultValue={text}
          onBlur={handleOnClick}
          onKeyDown={handleKeyDown}
          className="w-4/5 max-sm:w-full"
          type="text"
          autoFocus={text !== ""}
          placeholder={placeholders[fieldName]}
        />
      ) : (
        <button
          onClick={handleOnClick}
          className="w-4/5 max-sm:w-full justify-start border-none editable-input text-left"
        >
          {fieldName === "price" ? formatPrice(text) : text}
        </button>
      )}
    </div>
  );
}
