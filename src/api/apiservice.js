import axios from 'axios';
import API_BASE_URL from '../.env';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
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
    // Add mo
    // re methods (PUT, DELETE, etc.)
};
export default apiService;