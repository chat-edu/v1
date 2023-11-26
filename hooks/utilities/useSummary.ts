import {useEffect, useState} from "react";

const useSummary = (text: string) => {

    const [isLoading, setIsLoading] = useState(false);
    const [summary, setSummary] = useState('');

    useEffect(() => {
        setSummary('');
        setIsLoading(false)
    }, [text])

    const summarize = async () => {
        setIsLoading(true);
        const response = await fetch(process.env.NEXT_PUBLIC_CHAT_ENDPOINT + "/summarize", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({text}),
        });
        const summary = await response.json();
        setSummary(summary);
        setIsLoading(false);
    }

    return {
        summary,
        isLoading,
        summarize,
    }
}

export default useSummary;