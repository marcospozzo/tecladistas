import { ChangeEventHandler } from "react";

export interface ItemProps {
  id?: number;
  userId?: number;
  brand?: string;
  model?: string;
  title?: string;
  description?: string;
  year?: number;
  exchanges?: boolean;
  status?: "active" | "paused" | "deleted" | "sold";
  price?: number;
  pictures?: Array<string>;
  location?: string;
}

export interface ProfessionalProps {
  id: number;
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
  id: number;
  userId: number;
  name: string;
  description: string;
  services: Array<ServiceProps>;
  status: "active" | "inactive" | "deleted";
  visibility: "open" | "closed";
  pictures: Array<string>;
  location: string;
}

export interface ServiceProps {
  id: number;
  name: string;
}

export interface SkillProps {
  id: number;
  name: string;
  professionals: Array<number>;
}

export interface EditableInputProps {
  text?: string | number;
  label: string;
  fieldName: string;
  handleOnChange: ChangeEventHandler<HTMLInputElement>;
}

export interface EditableSelectProps {
  text: string | number;
  label: string;
  fieldName: string;
  handleOnChange: (event: Event) => void;
}

export interface User {
  id: number;
  email?: string;
  firstName: string;
  lastName: string;
  password: string;
  phone: string;
  role: "user" | "admin";
}
