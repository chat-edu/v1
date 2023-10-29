import {useEffect, useState} from "react";

import {Message, nanoid} from "ai";
import {useChat} from "ai/react";

import chunkString from "@/lib/chunkString";

import {multipleChoicePrePrompt} from "@/lib/multipleChoice";
import {textBasedPrePrompt} from "@/lib/textBased";

import {Note} from "@/types/Note";


const MAX_LENGTH = 16385 * 3;

const useOpenAi = (notes: Note[]) => {

    const [loading, setLoading] = useState<boolean>(false);

    const onFinish =  () => {
        setLoading(false);
    }

    const {
        messages,
        input,
        handleInputChange,
        handleSubmit,
        setMessages,
        append
    } = useChat({
        api: '/api/chat',
        onFinish,
    });

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
                content: multipleChoicePrePrompt,
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
                content: textBasedPrePrompt,
                role: 'system',
            }
        ])
        await append({
            id: nanoid(),
            content: "Please ask me a text-based question.",
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
        messages: messages.filter((message, index) => (
            message.role !== 'system' && (!loading || index !== messages.length - 1)
        )),
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