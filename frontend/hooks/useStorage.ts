'use client'

interface StorageItem<T> {
    key: string;
    value: T;
}

interface StorageState<T> {
    items: StorageItem<T>[];
    loading: boolean;
    error: string | null;
}

export function useStorage<T>(storageKey: string) {

    let key = storageKey


    const removeItem = (key: string) => {
        localStorage.removeItem(key)
    };
    const get = () => {
        const data = localStorage.getItem(key)
        if (data)
            return JSON.parse(data)
        return null
    }
    const set = (data: any) => {
        console.log(key)
        if (data)
            localStorage.setItem(key, JSON.stringify(data));
        return null
    }

    return {get, set};
}