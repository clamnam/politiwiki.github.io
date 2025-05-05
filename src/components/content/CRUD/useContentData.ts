import { useState, useEffect } from "react";
import axios from "axios";
import { Content, Page } from "../../../types";

export const useContentData = (id: string | undefined) => {
    const [page, setPage] = useState<Page | null>(null);
    const [content, setContent] = useState<Content[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        const fetchData = async () => {
            setIsLoading(true);
            try {
                // Fetch page data
                const pageUrl = `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_API_PAGE_ENDPOINT}${id}`;
                const pageResponse = await axios.get(pageUrl);
                setPage(pageResponse.data);

                // Fetch content data
                const contentUrl = `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_API_CONTENT_ENDPOINT}bypage/${id}`;
                const contentResponse = await axios.get(contentUrl);
                setContent(contentResponse.data);
            } catch (err) {
                console.error("Error fetching data:", err);
                setError("Failed to load data");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [id]);

    return { page, content, isLoading, error };
};