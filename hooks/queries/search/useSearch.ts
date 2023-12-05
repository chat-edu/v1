import {useEffect, useState} from "react";

const useSearch = <T>(input: string, endpoint: string) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [results, setResults] = useState<T[]>([]);

    useEffect(() => {
        const search = async () => {
            setLoading(true);
            const res = await fetch(`${endpoint}?q=${input}`);
            const data = await res.json();
            setResults(data);
            setLoading(false);
        }
        search();
    }, [endpoint, input]);

    return {
        loading,
        results
    };
}

export default useSearch;