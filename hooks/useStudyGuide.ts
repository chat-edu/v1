import {useChat} from "ai/react";
import {nanoid} from "ai";

import {context} from "@/prompts";
import {studyGuidePromptContent, studyGuideResponseDescription} from "@/prompts/commands/studyGuide";

import {Note} from "@/types/Note";
import {useEffect} from "react";

const useStudyGuide = (notes: Note[]) => {

    const {messages, setMessages, append, isLoading} = useChat({
        api: process.env.NEXT_PUBLIC_CHAT_ENDPOINT + '/noJson' as string,
    })

    useEffect(() => {
        setMessages([]);
    }, [notes])

    const generateStudyGuide = async () => {
        const content = `
            ${notes.map((note) => `
                ${note.content}
            `)}
        `;
        setMessages([
            {
                id: nanoid(),
                content: context(content),
                role: 'system',
            },
            {
                id: nanoid(),
                content: studyGuideResponseDescription,
                role: 'system',
            }
        ])
        await append({
            id: nanoid(),
            content: studyGuidePromptContent,
            role: 'user',
        });
    }

    return {
        generateStudyGuide,
        messages,
        isLoading
    }
}

export default useStudyGuide;