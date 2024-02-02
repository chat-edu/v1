import {useState, useEffect, useCallback} from "react";

const useItemData = <RowType, ReturnType>(url: string, transform: (row: RowType) => ReturnType) => {

    const [data, setData] = useState<ReturnType | null | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchItemData = useCallback(async () => {
        if(url === '') return;
        setLoading(true);
        await fetch(url, {
            method: 'GET',
        })
            .then(response => response.json())
            .then((data: RowType) => {
                setData(data ? transform(data) : null)
            })
            .catch(error => setError(error));
        setLoading(false);
    }, [url])

    useEffect(() => {
        fetchItemData();
    }, [fetchItemData, url]);

    return [data, loading, error, fetchItemData] as const;
}

export default useItemData;