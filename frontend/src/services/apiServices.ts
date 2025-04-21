import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosError } from "axios";
import Cookies from "js-cookie";

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL as string,
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = Cookies.get("token");
  if (token) {
    config.headers.set('Authorization', `Bearer ${token}`);
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
    (error: AxiosError) => {
    if (error.response?.status === 401) {
      Cookies.remove("token");
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

interface LoginData {
  email: string;
  password: string;
}

export const loginAdmin = (data: LoginData) =>
  api.post("/admin/login", data);

export const getAllStudents = () =>
  api.get("/student/all");

export const getStudent = (registrationNumber: string) =>
  api.get(`/student/get/${registrationNumber}`);

export const createStudent = (data: FormData) =>
  api.post("/student/new", data);
