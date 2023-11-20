import {useCallback, useEffect, useState} from "react";

const useContainerData = <T>(url: string) => {

    const [data, setData] = useState<T[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        if(url === '') return;
        setLoading(true);
        await fetch(url, {
            method: 'GET',
        })
            .then(response => response.json())
            .then((data: T[]) => setData(data))
            .catch(error => setError(error))
        setLoading(false);
    }, [url])

    useEffect(() => {
        fetchData();
    }, [fetchData, url]);

    return [data, loading, error, fetchData] as const
}

export default useContainerData;