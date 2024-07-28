import axios from "axios";
import { STORAGE_VARIABLES } from "@/shared/constants";
import toast from "react-hot-toast";
import { storage } from "@/lib/storage";

export function api() {
  const url = process.env.NEXT_PUBLIC_SOCKET_URL as string;
  const token = storage(STORAGE_VARIABLES.token);
  const instance = axios.create({
    baseURL: url,
    timeout: 10000,
    headers: {
      Authorization: `Bearer ${token.get()}`,
    },
  });
  instance.interceptors.response.use(
    (response) => {
      console.log(response.data);
      return response;
    },
    (error) => {
      if (error?.response?.data?.statusCode === 401)
        toast.error("Acceso no autorizado");
      if (error?.response?.data?.statusCode === 429)
        toast.error("Demasiados solicitudes");
      return error;
    },
  );
  return instance;
}
