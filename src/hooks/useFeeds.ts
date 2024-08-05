import { useState, useEffect } from 'react';
import { Feed, FetchFeedsResponse, Meta } from '../interface/feeds.interface';

interface UseFetchFeedsReturn {
    data: Feed[] | null;
    metadata: Meta | null;
    loading: boolean;
    error: string | null;
}

function useFetchFeeds(page: number, limit: number): UseFetchFeedsReturn {
    const [data, setData] = useState<Feed[]>([]);
    const [metadata, setMetadata] = useState<Meta>();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchFeeds = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${import.meta.env.VITE_URL_API_FEEDS}?page=${page}&limit=${limit}`);
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                const jsonData: FetchFeedsResponse = await response.json();
                setData(jsonData.data);
                setMetadata(jsonData.meta)
                setError(null);
            } catch (e) {
                if (e instanceof Error) {
                    setError(e.message);
                } else {
                    setError('An unexpected error occurred');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchFeeds();
    }, [page, limit]);

    return { data, metadata, loading, error };
}

export default useFetchFeeds;