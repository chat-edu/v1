import {FormEvent, useEffect, useState} from "react";

import {Message, nanoid} from "ai";
import {useChat} from "ai/react";

import useAuth from "@/hooks/useAuth";

import {updateScore} from "@/services/score";

import {
    answerCorrectnessCommand,
    getPrePrompt,
    getPrompt,
    questionResponseTagSuffix,
    ResponseTags,
    plainTextCommand,
    context
} from "@/prompts";

import {Command, CommandTypes} from "@/types/commands/Command";
import {Note} from "@/types/Note";
import {Notebook} from "@/types/Notebook";

export enum AnswerStates {
    CORRECT,
    INCORRECT,
    DONT_KNOW
}

const useChatEdu = (notebookId: Notebook["id"], notes: Note[]) => {

    const { user } = useAuth();

    const [promptType, setPromptType] = useState<CommandTypes>(CommandTypes.REGULAR);

    const [currentQuestion, setCurrentQuestion] = useState<Message | null>(null);

    const [answerMapping, setAnswerMapping] = useState<{[key: string]: AnswerStates}>({});

    const [messageBottomRef, setMessageBottomRef] = useState<HTMLDivElement | null>(null);

    const onFinish =  (message: Message) => {
        if(!currentQuestion && message.content.includes(`${questionResponseTagSuffix}`)) {
            setCurrentQuestion(message);
        } else if(message.content.includes(ResponseTags.ANSWER_CORRECTNESS)) {
            const correct = JSON.parse(message.content).content.correct;
            setAnswerMapping({
                ...answerMapping,
                [currentQuestion?.id || ""]: correct ? AnswerStates.CORRECT : AnswerStates.INCORRECT
            })
            if(correct && user) {
                updateScore(notebookId, user.id, 1)
            }
            setCurrentQuestion(null);
        } else if(message.content.includes(ResponseTags.DONT_KNOW)) {
            setAnswerMapping({
                ...answerMapping,
                [currentQuestion?.id || ""]: AnswerStates.DONT_KNOW
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
        stop,
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
        setAnswerMapping({});
        setPromptType(CommandTypes.REGULAR)
    }, [notes])

    const promptWithCommand = async (command: Command<any>) => {
        if(command.promptType === CommandTypes.DONT_KNOW) {
            setCurrentQuestion(null);
            setPromptType(CommandTypes.REGULAR)
        } else if(command.promptType !== CommandTypes.HINT) {
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
        answerMapping,
        isLoading,
        handleInputChange,
        onSubmit,
        promptWithCommand,
        setMessageBottomRef,
        stop
    };
}

export default useChatEdu;