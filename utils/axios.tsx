import axios from "axios";

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

export const login = async (credentials: any) => {
  try {
    await axiosInstance.post("/users/login", credentials);
  } catch (error) {
    throw error;
  }
};
