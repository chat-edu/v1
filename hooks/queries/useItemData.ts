import {useState, useEffect, useCallback} from "react";

const useItemData = <T>(url: string) => {

    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchItemData = useCallback(async () => {
        if(url === '') return;
        setLoading(true);
        await fetch(url, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => setError(error))
        setLoading(false);
    }, [url])

    useEffect(() => {
        fetchItemData();
    }, [fetchItemData, url]);

    return [data, loading, error, fetchItemData] as const;
}

export default useItemData;