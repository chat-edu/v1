import {useCallback, useEffect, useState} from "react";



const useContainerData = <RowType, ReturnType>(url: string, transform: (row: RowType) => ReturnType) => {

    const [data, setData] = useState<ReturnType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        if(url === '') return;
        await fetch(url, {
            method: 'GET',
        })
            .then(response => response.json())
            .then((data: RowType[]) => setData(data.map(transform)))
            .catch(error => setError(error))
        setLoading(false);
    }, [url])

    useEffect(() => {
        fetchData();
    }, [fetchData, url]);

    return [data, loading, error, fetchData] as const
}

export default useContainerData;