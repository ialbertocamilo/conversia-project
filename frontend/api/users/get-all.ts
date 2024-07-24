import {api} from "@/lib/api";

export async function getAll(){

    try {
        const response = await api().get('/user')
        if (response.status === 200) {
            return response.data;
        }
        throw new Error('Failed to save register');

    } catch (error) {
        console.error('Error :', error);
        throw error;
    }
}