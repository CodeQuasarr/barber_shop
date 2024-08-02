import {useUserStore} from "@/stores/user";

interface FetchOptions extends RequestInit {
    body?: string;
}
export default async function fetchApiWithToken<T>(path: string, method: string = 'GET', data: any = null ): Promise<T> {
    let options: FetchOptions = {
        method: method,
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${useUserStore().getToken}`
        }
    };
    if (data) {
        options = {
            ...options,
            body: JSON.stringify(data),
        };
    }

    const response =  await fetch(`${import.meta.env.VITE_API_BASE_URL}/${path}`, options);

    const content = await response.json();
    if (!response.ok) {
        throw new Error(content.message);
    }
    return content.data as T;
}
