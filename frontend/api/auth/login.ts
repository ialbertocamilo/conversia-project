import {api} from "@/lib/api";

export interface ILogIn {

    username: string;
    password: string
}

export async function logIn(data: ILogIn) {
    console.log("login")
    try {
        const response = await api().post('/auth/login', data)
        console.log("response ",response)
        if (response.status === 200) {
            return response.data;
        }
        throw new Error('Failed to authenticate');

    } catch (error) {
        console.error('Error :', error);
        throw error;
    }
}