import axios from 'axios';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const apiService = {
    async get(endpoint: string) {
        const response = await apiClient.get(endpoint);
        return response.data;
    },

    async post(endpoint: string, data: unknown) {
        const response = await apiClient.post(endpoint, data);
        return response.data;
    }
};

export default apiService;