import {FormEvent, useEffect, useState} from "react";

import {Message, nanoid} from "ai";
import {useChat} from "ai/react";

import {answerCorrectnessCommand,} from "@/prompts";
import {answerCorrectnessResponseTag} from "@/prompts/commands/answerCorrectness";
import {getPrePrompt, getPrompt} from "@/prompts";
import {questionResponseTagSuffix} from "@/prompts/tags";
import {context} from "@/prompts/context";

import {Command, CommandTypes} from "@/types/commands/Command";
import {Note} from "@/types/Note";
import {plainTextCommand} from "@/prompts/commands/plainText";

const useChatEdu = (notes: Note[]) => {

    const [promptType, setPromptType] = useState<CommandTypes>(CommandTypes.REGULAR);

    const [currentQuestion, setCurrentQuestion] = useState<Message | null>(null);

    const [correctMapping, setCorrectMapping] = useState<{[key: string]: boolean}>({});

    const [messageBottomRef, setMessageBottomRef] = useState<HTMLDivElement | null>(null);

    const onFinish =  (message: Message) => {
        if(!currentQuestion && message.content.includes(`${questionResponseTagSuffix}`)) {
            setCurrentQuestion(message);
        } else if(message.content.includes(answerCorrectnessResponseTag)) {
            setCorrectMapping({
                ...correctMapping,
                [currentQuestion?.id || ""]: JSON.parse(message.content).content.correct
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
        setMessages,
        append,
        isLoading
    } = useChat({
        api: process.env.NEXT_PUBLIC_CHAT_ENDPOINT as string,
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
        setPromptType(CommandTypes.REGULAR)
    }, [notes])

    const promptWithCommand = async (command: Command<any>) => {
        if(command.promptType !== CommandTypes.HINT) {
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
            content: JSON.stringify(getPrompt(command)),
            role: 'user',
        });
    }

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        if(promptType == CommandTypes.TEXT_BASED) {
            e.preventDefault();
            await promptWithCommand(answerCorrectnessCommand(currentQuestion?.content || "", input));
            setInput('');
        } else {
            e.preventDefault();
            await promptWithCommand(plainTextCommand(input));
            setInput('');
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

export default useChatEdu;