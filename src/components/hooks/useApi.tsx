import { useState, useCallback } from 'react';
import { apiService } from '../../api/apiservice.tsx';

export const useApi = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const execute = useCallback(async (method: keyof typeof apiService, endpoint: string, data: Record<string, unknown> | null = null) => {
        try {
            setLoading(true);
            setError(null);
            const response = await apiService[method](endpoint, data);
            return response;
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError(String(err));
            }
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return { execute, loading, error };
};