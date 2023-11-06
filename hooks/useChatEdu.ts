import {FormEvent, useEffect, useState} from "react";

import {Message, nanoid} from "ai";
import {useChat} from "ai/react";

import chunkString from "@/lib/chunkString";

import {
    answerCorrectnessPrompt,
    hintPrompt,
    multipleChoicePrompt,
    studyGuidePrompt,
    textBasedPrompt,
} from "@/prompts/prompts";
import {answerCorrectnessResponseTag, incorrectTag} from "@/prompts/answerCorrectness";

import {Prompt, PromptTypes} from "@/types/prompts/Prompt";


import {Note} from "@/types/Note";
import {getPrePrompt, getPrompt} from "@/prompts";
import {questionResponseTagSuffix} from "@/prompts/tags";

const MAX_LENGTH = 16385 * 3;

const useOpenAi = (notes: Note[]) => {

    const [promptType, setPromptType] = useState<PromptTypes>(PromptTypes.REGULAR);

    const [currentQuestionId, setCurrentQuestionId] = useState<string | null>(null);

    const [correctMapping, setCorrectMapping] = useState<{[key: string]: boolean}>({});

    const [messageBottomRef, setMessageBottomRef] = useState<HTMLDivElement | null>(null);

    const onFinish =  (message: Message) => {
        if(!currentQuestionId && message.content.includes(`${questionResponseTagSuffix}: `)) {
            setCurrentQuestionId(message.id);
        } else if(message.content.includes(answerCorrectnessResponseTag)) {
            setCorrectMapping({
                ...correctMapping,
                [currentQuestionId || ""]: !message.content.includes(incorrectTag)
            })
        }
        scrollToBottom();
    }

    const scrollToBottom = () => {
        if (!messageBottomRef) return;
        messageBottomRef.scroll({
            top: messageBottomRef.scrollHeight,
            behavior: 'auto'
        })
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
        scrollToBottom();
    }, [messages])

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
                    You are to act as a teacher helping a student learn content they have taken notes on. 
                    
                    You can only respond with information that is within the notes include below. If they ask a question that is not in the notes, kindly tell them that you can only answer questions that are in the notes.
                    
                    You can use external information to describe concepts.
                    
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

        setCurrentQuestionId(null);
        setCorrectMapping({});
        setPromptType(PromptTypes.REGULAR)
    }, [notes])

    const promptWithContext = async (prompt: Prompt<any>) => {
        if(prompt.promptType !== PromptTypes.HINT) {
            setPromptType(prompt.promptType);
        }
        setMessages([
            ...messages,
            {
                id: nanoid(),
                content: getPrePrompt(prompt),
                role: 'system',
            }
        ])
        await append({
            id: nanoid(),
            content: getPrompt(prompt),
            role: 'user',
        });
    }

    const askMultipleChoiceQuestion = async () => {
        await promptWithContext(multipleChoicePrompt);
    }

    const answerMultipleChoiceQuestion = async (answer: string) => {
        await promptWithContext(answerCorrectnessPrompt(answer))
        setCurrentQuestionId(null);
    }

    const askFreeFormQuestion = async () => {
        await promptWithContext(textBasedPrompt);
    }

    const askForHint = async () => {
        await promptWithContext(hintPrompt)
    }

    const answerFreeFormQuestion = async (text: string) => {
        await promptWithContext(answerCorrectnessPrompt(text));
        setCurrentQuestionId(null);
    }

    const generateStudyGuide = async () => {
        await promptWithContext(studyGuidePrompt)
        setPromptType(PromptTypes.REGULAR)
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
        messages: messages.filter((message) => (message.role !== 'system')),
        input,
        promptType,
        correctMapping,
        handleInputChange,
        onSubmit,
        askMultipleChoiceQuestion,
        askFreeFormQuestion,
        generateStudyGuide,
        answerMultipleChoiceQuestion,
        askForHint,
        setMessageBottomRef
    };
}

export default useOpenAi;