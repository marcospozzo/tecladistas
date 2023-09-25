import { ProductProps, ProfessionalProps, StudioProps } from "@/types";
import axios, { AxiosResponse } from "axios";
import { cookies } from "next/headers";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});

//   axiosInstance.interceptors.request.use((config) => {
//     if (config.data instanceof FormData) {
//       config.headers["Content-Type"] = "multipart/form-data";
//     } else {
//       config.headers["Content-Type"] = "application/json";
//     }
//     return config;
//   });

axiosInstance.interceptors.request.use((config) => {
  const cookie = cookies().get("next-auth.session-token");
  config.headers.Authorization = cookie?.value;
  return config;
});

export const login = async (credentials: any) => {
  try {
    await axiosInstance.post("/users/login", credentials);
  } catch (error) {
    throw error;
  }
};

export const createAccount = async (data: any) => {
  try {
    await axiosInstance.post("/users/create", data);
  } catch (error) {
    throw error;
  }
};

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
    console.log(error);
    return false;
  }
};
