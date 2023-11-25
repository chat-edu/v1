import {FormEvent, useEffect, useState} from "react";

import {Message, nanoid} from "ai";
import {useChat} from "ai/react";

import useAuth from "@/hooks/useAuth";

import {updateScore} from "@/services/score";

import {answerCorrectnessCommand} from "@/prompts";
import {answerCorrectnessResponseTag} from "@/prompts/commands/answerCorrectness";
import {getPrePrompt, getPrompt} from "@/prompts";
import {questionResponseTagSuffix} from "@/prompts/tags";
import {plainTextCommand} from "@/prompts/commands/plainText";
import {context} from "@/prompts/context";

import {Command, CommandTypes} from "@/types/commands/Command";
import {Note} from "@/types/Note";
import {Notebook} from "@/types/Notebook";

const useChatEdu = (notebookId: Notebook["id"], notes: Note[]) => {

    const { user } = useAuth();

    const [promptType, setPromptType] = useState<CommandTypes>(CommandTypes.REGULAR);

    const [currentQuestion, setCurrentQuestion] = useState<Message | null>(null);

    const [correctMapping, setCorrectMapping] = useState<{[key: string]: boolean}>({});

    const [messageBottomRef, setMessageBottomRef] = useState<HTMLDivElement | null>(null);

    const onFinish =  (message: Message) => {
        if(!currentQuestion && message.content.includes(`${questionResponseTagSuffix}`)) {
            setCurrentQuestion(message);
        } else if(message.content.includes(answerCorrectnessResponseTag)) {
            const correct = JSON.parse(message.content).content.correct;
            setCorrectMapping({
                ...correctMapping,
                [currentQuestion?.id || ""]: correct
            })
            if(correct && user) {
                updateScore(notebookId, user.id, 1)
            }
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
        e.preventDefault();
        await promptWithCommand(promptType == CommandTypes.TEXT_BASED
            ? answerCorrectnessCommand(currentQuestion?.content || "", input)
            : plainTextCommand(input));
        setInput('');
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