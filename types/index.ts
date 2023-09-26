import { ChangeEventHandler } from "react";

export interface ProductProps {
  _id?: string;
  userId?: number;
  title?: string;
  brand?: string;
  model?: string;
  description?: string;
  year?: number;
  exchanges?: boolean;
  status?: "active" | "paused" | "deleted" | "sold";
  price?: number;
  pictures?: Array<string>;
  location?: string;
}

export interface ProfessionalProps {
  _id: string;
  firstName: string;
  lastName?: string;
  nickname?: string;
  profilePicture?: string;
  type: "technician" | "teacher";
  skills: Array<string>;
  workplace?: "onSite" | "offSite" | "both";
  isTecladista?: boolean;
  website?: string;
  email?: string;
  phone?: string;
  location?: string;
}

export interface StudioProps {
  _id: string;
  userId: number;
  name: string;
  description: string;
  services: Array<string>;
  status: "active" | "inactive" | "deleted";
  pictures: Array<string>;
  location: string;
}

export interface EditableInputProps {
  text?: string | number;
  label: string;
  fieldName: string;
  handleOnChange: ChangeEventHandler<HTMLInputElement>;
}
export interface UserProps {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}
