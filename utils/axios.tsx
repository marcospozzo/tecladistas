"use client";

import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  // headers: {
  //   "Authorization": JSON.parse(localStorage.getItem("Authorization") || "{}"),
  // },
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
    const response = await axiosInstance.post("/users/login", credentials);
    if (response.data.accessToken) {
      localStorage.setItem(
        "Authorization",
        JSON.stringify(response.data.accessToken)
      );
    }
  } catch (error) {
    throw error;
  }
};
