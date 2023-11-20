import {FormEvent, useEffect, useState} from "react";

import {Message, nanoid} from "ai";
import {useChat} from "ai/react";

import {answerCorrectnessCommand,} from "@/prompts";
import {answerCorrectnessResponseTag, incorrectTag} from "@/prompts/commands/answerCorrectness";
import {getPrePrompt, getPrompt} from "@/prompts";
import {questionResponseTagSuffix} from "@/prompts/tags";
import {context} from "@/prompts/context";

import {Command, PromptTypes} from "@/types/prompts/Command";
import {Note} from "@/types/Note";

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
            setCurrentQuestion(null);
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
                content: context(content),
                role: 'system',
            }
        ])
        setCurrentQuestion(null);
        setCorrectMapping({});
        setPromptType(PromptTypes.REGULAR)
    }, [notes])

    const promptWithCommand = async (command: Command<any>) => {
        if(command.promptType !== PromptTypes.HINT) {
            setPromptType(command.promptType);
        }
        setMessages([
            ...messages,
            {
                id: nanoid(),
                content: getPrePrompt(command),
                role: 'system',
            }
        ])
        await append({
            id: nanoid(),
            content: getPrompt(command),
            role: 'user',
        });
    }

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        if(promptType == PromptTypes.TEXT_BASED) {
            e.preventDefault();
            await promptWithCommand(answerCorrectnessCommand(currentQuestion?.content || "", input));
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
        promptWithCommand,
        setMessageBottomRef
    };
}

export default useOpenAi;