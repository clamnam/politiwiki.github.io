import { useState, useCallback } from 'react';
import { apiService } from '../api/apiservice.js';

export const useApi = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const execute = useCallback(async (method, endpoint, data = null) => {
        try {
            setLoading(true);
            setError(null);
            const response = await apiService[method](endpoint, data);
            return response;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return { execute, loading, error };
};