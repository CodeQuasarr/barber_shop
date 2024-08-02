interface FetchOptions extends RequestInit {
    body?: string;
}
export default async function fetchApi<T>(path: string, method: string = 'GET', data = null ): Promise<T> {
    let options: FetchOptions = {
        method: method,
        headers: {
            accept: 'application/json',
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
