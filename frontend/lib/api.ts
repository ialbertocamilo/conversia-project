import axios from "axios";
import {useStorage} from "@/hooks/useStorage";
import {STORAGE_VARIABLES} from "@/shared/constants";

export function api() {
    const url = process.env.NEXT_PUBLIC_SOCKET_URL as string
    const token = useStorage(STORAGE_VARIABLES.token)
    return axios.create({
        baseURL: url, timeout: 1000, headers: {
            'Authorization': `Bearer ${token.get()}`
        }
    })
}