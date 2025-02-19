import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const apiService = {
    async get(endpoint) {
        try {
            const response = await apiClient.get(endpoint);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    async post(endpoint, data) {
        try {
            const response = await apiClient.post(endpoint, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};

export default apiService;