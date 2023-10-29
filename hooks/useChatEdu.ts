import {useEffect, useState, FormEvent} from "react";

import {Message, nanoid} from "ai";
import {useChat} from "ai/react";

import chunkString from "@/lib/chunkString";
import {multipleChoiceAnswerPrePrompt, multipleChoicePrePrompt} from "@/lib/multipleChoice";
import {textBasedAnswerPrompt, textBasedPrePrompt} from "@/lib/textBased";
import {answerCheckTag, incorrectTag} from "@/lib/answerCorrectness";

import {Note} from "@/types/Note";

const MAX_LENGTH = 16385 * 3;

export enum PromptTypes {
    REGULAR,
    MULTIPLE_CHOICE,
    TEXT_BASED,
    STUDY_GUIDE
}

const useOpenAi = (notes: Note[]) => {

    const [loading, setLoading] = useState<boolean>(false);

    const [promptType, setPromptType] = useState<PromptTypes>(PromptTypes.REGULAR);

    const [currentQuestionId, setCurrentQuestionId] = useState<string | null>(null);

    const [correctMapping, setCorrectMapping] = useState<{[key: string]: boolean}>({});

    const onFinish =  (message: Message) => {
        setLoading(false);
        if(!currentQuestionId && message.content.includes('Question: ')) {
            setCurrentQuestionId(message.id);
        } else if(message.content.includes(answerCheckTag)) {
            setCorrectMapping({
                ...correctMapping,
                [currentQuestionId || ""]: !message.content.includes(incorrectTag)
            })
        }
    }

    const {
        messages,
        input,
        setInput,
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
        setPromptType(PromptTypes.MULTIPLE_CHOICE);
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

    const answerMultipleChoiceQuestion = async (answer: string) => {
        await append({
            id: nanoid(),
            content: multipleChoiceAnswerPrePrompt(answer),
            role: 'system',
        });
        setPromptType(PromptTypes.REGULAR);
        setCurrentQuestionId(null);
    }

    const askFreeFormQuestion = async () => {
        setPromptType(PromptTypes.TEXT_BASED);
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

    const askForHint = async () => {
        await append({
            id: nanoid(),
            content: "Can you give me a hint?",
            role: 'user',
        })
    }

    const answerFreeFormQuestion = async (text: string) => {
        await append({
            id: nanoid(),
            content: textBasedAnswerPrompt(text),
            role: 'system',
        })
        setPromptType(PromptTypes.REGULAR);
        setCurrentQuestionId(null);
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

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        if(promptType == PromptTypes.TEXT_BASED) {
            e.preventDefault();
            await answerFreeFormQuestion(input);
            setInput('');
        } else {
            handleSubmit(e)
        }
    }

    return {
        messages: messages.filter((message, index) => (
            message.role !== 'system' && (!loading || index !== messages.length - 1)
        )),
        input,
        loading,
        promptType,
        correctMapping,
        handleInputChange,
        onSubmit,
        askMultipleChoiceQuestion,
        askFreeFormQuestion,
        generateStudyGuide,
        answerMultipleChoiceQuestion,
        askForHint
    };
}

export default useOpenAi;