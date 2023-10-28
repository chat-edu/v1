import {useEffect, useState} from "react";

import {Message, nanoid} from "ai";
import {useChat} from "ai/react";

import {Note} from "@/types/Note";
import chunkString from "@/lib/chunkString";

const MAX_LENGTH = 16385 * 3;

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

        const content = `
            ${notes.map((note) => `
                ${note.content}
            `)}
        `;

        setMessages([
            {
                id: nanoid(),
                content: `
                    You are to act as a teacher helping a student learn content they have taken notes on. You can only respond with information that is within the notes include below.
                    
                    These are the notes the student has taken so far:
                `,
                role: 'system',
            },
            ...chunkString(content, MAX_LENGTH).map((content): Message => ({
                id: nanoid(),
                content,
                role: 'system',
            }))
        ])
    }, [notes])

    const askMultipleChoiceQuestion = async () => {
        setLoading(true);
        setMessages([
            ...messages,
            {
                id: nanoid(),
                content: `Multiple choice questions must be in the following format:
                    Multiple Choice Question: <question>? 
                    A) <answer 1>
                    B) <answer 2> 
                    C) <answer 3> 
                    D) <answer 4>
                    Answer: <letter of correct answer>
                `,
                role: 'system',
            }
        ])
        await append({
            id: nanoid(),
            content: "Please ask me a multiple choice question",
            role: 'user',
        });
    }

    const askFreeFormQuestion = async () => {
        setMessages([
            ...messages,
            {
                id: nanoid(),
                content: "Do not add the answer to the question. The user will input it next.",
                role: 'system',
            }
        ])
        await append({
            id: nanoid(),
            content: "Please ask me a text based question.",
            role: 'user',
        })
    }

    const generateStudyGuide = async () => {
        setMessages([
            ...messages,
            {
                id: nanoid(),
                content: "Study guides should be in markdown format and should be 5% of the length and should only include the most important information.",
                role: 'system',
            }
        ])
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