import {useEffect, useState} from "react";

import {nanoid} from "ai";
import {useChat} from "ai/react";

import {Note} from "@/types/Note";

export enum PromptTypes {
    PLAIN_TEXT,
    MULTIPLE_CHOICE_QUESTION,
    TEXT_BASED_QUESTION,
    STUDY_GUIDE

}

const useOpenAi = (notes: Note[]) => {

    const {
        messages,
        input,
        handleInputChange,
        handleSubmit,
        setMessages,
        append
    } = useChat({
        api: '/api/chat',
    });

    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setMessages([
            {
                id: '1',
                content: `
                
                    You are to act as a teacher helping a student learn content they have taken notes on.
                    
                    These are the notes the student has taken so far:
                    
                    ${notes.map((note) => `
                        ${note.content}
                    `)} 
                `,
                role: 'system',
            }
        ])
    }, [notes])

    const askMultipleChoiceQuestion = async () => {
        setLoading(true);
        await append({
            id: nanoid(),
            content: "Please ask me a multiple choice question",
            role: 'user',
        });
    }

    const askFreeFormQuestion = async () => {
        await append({
            id: nanoid(),
            content: "Please ask me a text based question",
            role: 'user',
        })
    }

    const generateStudyGuide = async () => {
        await append({
            id: nanoid(),
            content: "Please make me a study guide",
            role: 'user',
        })
    }


    return {
        messages: messages.filter((message) => message.role !== 'system'),
        input,
        loading,
        handleInputChange,
        handleSubmit,
        askMultipleChoiceQuestion,
        askFreeFormQuestion,
        generateStudyGuide,
    };
}

export default useOpenAi;