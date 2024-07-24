import {api} from "@/lib/api";

export interface IRegister {
    name: string,
    username: string,
    password: string
}

export async function register(data: IRegister) {
    try {
        const response = await api().post('/auth', data)
        if (response.status === 200) {
            return response.data;
        }
        throw new Error('Failed to save register');

    } catch (error) {
        console.error('Error :', error);
        throw error;
    }
}