import {useEffect, useState, FormEvent} from "react";

import {Message, nanoid} from "ai";
import {useChat} from "ai/react";

import chunkString from "@/lib/chunkString";

import {Prompt, PromptTypes} from "@/prompts/Prompt";
import {questionResponseTagSuffix} from "@/prompts/questions";
import {MultipleChoicePrompt} from "@/prompts/MultipleChoicePrompt";
import {AnswerCorrectnessPrompt, answerCorrectnessResponseTag, incorrectTag} from "@/prompts/AnswerCorrectnessPrompt";
import {TextBasedPrompt} from "@/prompts/TextBasedPrompt";
import {HintPrompt} from "@/prompts/HintPrompt";
import {StudyGuidePrompt} from "@/prompts/StudyGuidePrompt";

import {Note} from "@/types/Note";

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
        setPromptType(prompt.getPromptType());
        setMessages([
            ...messages,
            {
                id: nanoid(),
                content: prompt.getPrePrompt(),
                role: 'system',
            }
        ])
        await append({
            id: nanoid(),
            content: prompt.getPrompt(),
            role: 'user',
        });
    }

    const askMultipleChoiceQuestion = async () => {
        await promptWithContext(new MultipleChoicePrompt());
    }

    const answerMultipleChoiceQuestion = async (answer: string) => {
        await promptWithContext(new AnswerCorrectnessPrompt(answer))
        setCurrentQuestionId(null);
    }

    const askFreeFormQuestion = async () => {
        await promptWithContext(new TextBasedPrompt());
    }

    const askForHint = async () => {
        await promptWithContext(new HintPrompt())
        setPromptType(PromptTypes.REGULAR)
    }

    const answerFreeFormQuestion = async (text: string) => {
        await promptWithContext(new AnswerCorrectnessPrompt(text))
        setCurrentQuestionId(null);
    }

    const generateStudyGuide = async () => {
        await promptWithContext(new StudyGuidePrompt())
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