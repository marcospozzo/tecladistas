import { ChangeEventHandler } from "react";
export interface ProductProps {
  [key: string]: any;
  _id?: string;
  userId?: string;
  title?: string;
  brand?: string;
  model?: string;
  description?: string;
  year?: number;
  exchanges?: boolean;
  status?: "active" | "deleted" | "sold";
  listingType?: "sale" | "rent";
  price?: number;
  pictures?: Array<string>;
  location?: string;
  createdAt?: string;
}

export interface Rating {
  userId: string;
  rating: number;
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
  ratings?: Array<Rating>;
}
export interface StudioProps {
  _id: string;
  userId: string;
  name: string;
  description: string;
  services: Array<string>;
  status: "active" | "inactive" | "deleted";
  images: Array<string>;
  website?: string;
  location?: string;
}
export interface EditableInputProps {
  text?: string | number;
  label: string;
  fieldName: string;
  handleOnChange: ChangeEventHandler<HTMLInputElement>;
}
export interface UserProps {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export type Page = {
  title: string;
  path: string;
  subpages?: Page[];
};
