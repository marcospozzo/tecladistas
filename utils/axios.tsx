import {
  ProductProps,
  ProfessionalProps,
  StudioProps,
  UserProps,
} from "@/types";
import axios, { AxiosResponse } from "axios";
import { cookies } from "next/headers";
import { cookieName } from "./utils";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const cookie = cookies().get(cookieName);
  config.headers.cookie = `${cookie?.name}=${cookie?.value}`;
  config.headers.Authorization = process.env.NEXT_SECRET;
  if (config.data instanceof FormData) {
    config.headers["Content-Type"] = "multipart/form-data";
  } else {
    config.headers["Content-Type"] = "application/json";
  }
  return config;
});

export const getProfessionals = async (): Promise<Array<ProfessionalProps>> => {
  try {
    const response: AxiosResponse<ProfessionalProps[]> =
      await axiosInstance.get("/professionals");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getStudios = async (): Promise<Array<StudioProps>> => {
  try {
    const response: AxiosResponse<StudioProps[]> = await axiosInstance.get(
      "/studios"
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProducts = async (): Promise<Array<ProductProps>> => {
  try {
    const response: AxiosResponse<ProductProps[]> = await axiosInstance.get(
      "/products"
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const userIsAllowedToSignIn = async (body: object): Promise<boolean> => {
  try {
    const response = await axiosInstance.post(
      "/users/is-allowed-to-sign-in",
      body
    );
    return response.status === 200;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getProfessional = async (
  professionalId: string
): Promise<ProfessionalProps> => {
  try {
    const response: AxiosResponse<ProfessionalProps> = await axiosInstance.get(
      `/professionals/${professionalId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const handleProductCreation = async (formData: FormData) => {
  try {
    const promise = axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/create`,
      formData
    );
  } catch (error) {
    console.error(error);
  }
};

export const getProduct = async (productId: string): Promise<ProductProps> => {
  try {
    const response: AxiosResponse<ProductProps> = await axiosInstance.get(
      `/products/${productId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getStudio = async (studioId: string): Promise<StudioProps> => {
  try {
    const response: AxiosResponse<StudioProps> = await axiosInstance.get(
      `/studios/${studioId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUser = async (userId: string): Promise<UserProps> => {
  try {
    const response: AxiosResponse<UserProps> = await axiosInstance.get(
      `/users/${userId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

type Count = { count: Number };

export const getWhitelistedUsersCount = async () => {
  try {
    const response: AxiosResponse<Count> = await axiosInstance.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/count-whitelisted-users`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export type SheetMusic = {
  id: string;
  fileName: string;
  downloadCount: number;
  title?: string;
  composer?: string;
  genre?: string;
  difficulty?: string;
  year?: number;
};

export const getAllSheetMusic = async () => {
  try {
    const response: AxiosResponse<SheetMusic[]> = await axiosInstance.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/sheet-music`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
