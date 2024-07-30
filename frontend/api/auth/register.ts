import { api } from "@/lib/api";
import {type} from "node:os";

export interface IRegister {
  name: string;
  username: string;
  password: string;
}

export async function register(data: IRegister) {
  try {
    const result = await api().post("/auth", data);
    return { statusCode: result.status, result: result.data };
  } catch (error: any) {
    return { statusCode: error?.response?.status, result: error?.response?.data };
  }
}
