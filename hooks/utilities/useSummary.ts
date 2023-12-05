import {useEffect, useState} from "react";
import {useChat} from "ai/react";
import {summarizePrompt} from "@/prompts/summarize";

const useSummary = (text: string) => {

    const [isLoading, setIsLoading] = useState(false);
    const [summary, setSummary] = useState('');

    const { append } = useChat({
        api: process.env.NEXT_PUBLIC_CHAT_ENDPOINT,
        onFinish: (message) => {
            setSummary(message.content);
            setIsLoading(false);
        }
    })

    useEffect(() => {
        setSummary('');
        setIsLoading(false)
    }, [text])

    const summarize = async () => {
        setIsLoading(true);
        await append({
            role: 'user',
            content: summarizePrompt(text),
        });
    }

    return {
        summary,
        isLoading,
        summarize,
    }
}

export default useSummary;