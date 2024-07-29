import { api } from "@/lib/api";
import { User } from "@/interfaces/online-users.interface";

export async function getAll() {
  try {
    const response = await api().get("/user");
    if (response.status === 200) {
      return response.data as User[];
    }
  } catch (error) {
    console.error("Error :", error);
    throw error;
  }
}
