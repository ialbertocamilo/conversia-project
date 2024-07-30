import {api} from "@/lib/api";
import toast from "react-hot-toast";

export interface ILogIn {

    username: string;
    password: string
}

export async function logIn(data: ILogIn) {
    try {
        const response = await api().post('/auth/login', data)
        if (response.status === 200) {
            return response.data;
        }

    } catch (error) {
        console.error('Error :', error);
    }
}