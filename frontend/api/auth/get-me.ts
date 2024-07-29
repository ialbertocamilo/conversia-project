import {api} from "@/lib/api";
import {IUser} from "@/interfaces/users";
import {User} from "@/interfaces/online-users.interface";

export async function getMe(){

    try {
        const response = await api().get('/auth/profile')
        if (response.status === 200) {
            return response.data as User;
        }

    } catch (error) {
        console.error('Error :', error);
    }
}