"use client";

import { EditableInputProps } from "@/types";
import { ChangeEventHandler, KeyboardEventHandler, useState } from "react";

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
    <div className="flex editable-row">
      <label className="text-xl self-center w-1/5">{`${label}:`}</label>
      {isEditing || text === "" ? (
        <input
          name={fieldName}
          onChange={handleOnChangeEdit}
          defaultValue={text}
          onBlur={handleOnClick}
          onKeyDown={handleKeyDown}
          className="w-4/5"
          type="text"
          autoFocus={text !== ""}
        />
      ) : (
        <button
          onClick={handleOnClick}
          className="w-4/5 justify-start border-none editable-input text-left"
        >
          {text}
        </button>
      )}
    </div>
  );
}
