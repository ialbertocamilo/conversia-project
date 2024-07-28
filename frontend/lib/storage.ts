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

export function storage<T>(storageKey: string) {

    let key = storageKey


    const removeItem = () => {
        localStorage.removeItem(key)
    };
    const get = () => {
        const data = localStorage.getItem(key)
        if (data)
            return JSON.parse(data)
        return null
    }
    const set = (data: any | null) => {
        localStorage.setItem(key, JSON.stringify(data));
    }

    return {get, set,removeItem};
}