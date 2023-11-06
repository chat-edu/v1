import {FormEvent, useEffect, useState} from "react";

import {Message, nanoid} from "ai";
import {useChat} from "ai/react";

import chunkString from "@/lib/chunkString";

import {
    answerCorrectnessCommand,
    hintCommand,
    multipleChoiceCommand,
    studyGuideCommand,
    understandingQuestionCommand,
    applicationQuestionCommand
} from "@/prompts";
import {answerCorrectnessResponseTag, incorrectTag} from "@/prompts/commands/answerCorrectness";

import {Command, PromptTypes} from "@/types/prompts/Command";


import {Note} from "@/types/Note";
import {getPrePrompt, getPrompt} from "@/prompts";
import {questionResponseTagSuffix} from "@/prompts/tags";

const MAX_LENGTH = 16385 * 3;

const useOpenAi = (notes: Note[]) => {

    const [promptType, setPromptType] = useState<PromptTypes>(PromptTypes.REGULAR);

    const [currentQuestion, setCurrentQuestion] = useState<Message | null>(null);

    const [correctMapping, setCorrectMapping] = useState<{[key: string]: boolean}>({});

    const [messageBottomRef, setMessageBottomRef] = useState<HTMLDivElement | null>(null);

    const onFinish =  (message: Message) => {
        if(!currentQuestion && message.content.includes(`${questionResponseTagSuffix}: `)) {
            setCurrentQuestion(message);
        } else if(message.content.includes(answerCorrectnessResponseTag)) {
            setCorrectMapping({
                ...correctMapping,
                [currentQuestion?.id || ""]: !message.content.includes(incorrectTag)
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
        append,
        isLoading
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
                    
                    You should limit the topics you describe to the notes the student has taken. In the case of application or understanding questions, you can create examples that are not included in the notes. It is encouraged to make problems that disguise the class of problem to which the student should apply the concept.
                    
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

        setCurrentQuestion(null);
        setCorrectMapping({});
        setPromptType(PromptTypes.REGULAR)
    }, [notes])

    const promptWithContext = async (prompt: Command<any>) => {
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
        await promptWithContext(multipleChoiceCommand);
    }

    const answerMultipleChoiceQuestion = async (answer: string) => {
        await promptWithContext(answerCorrectnessCommand(currentQuestion?.content || "", answer))
        setCurrentQuestion(null);
    }

    const askApplicationQuestion = async () => {
        await promptWithContext(applicationQuestionCommand);
    }

    const askUnderstandingQuestion = async () => {
        await promptWithContext(understandingQuestionCommand);
    }

    const askForHint = async () => {
        await promptWithContext(hintCommand)
    }

    const answerFreeFormQuestion = async (text: string) => {
        await promptWithContext(answerCorrectnessCommand(currentQuestion?.content || "", text));
        setCurrentQuestion(null);
    }

    const generateStudyGuide = async () => {
        await promptWithContext(studyGuideCommand)
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
        isLoading,
        handleInputChange,
        onSubmit,
        askMultipleChoiceQuestion,
        askUnderstandingQuestion,
        askApplicationQuestion,
        generateStudyGuide,
        answerMultipleChoiceQuestion,
        askForHint,
        setMessageBottomRef
    };
}

export default useOpenAi;