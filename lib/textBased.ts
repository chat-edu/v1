import {Message} from "ai";

import {correctTag, incorrectTag, answerCheckTag} from "@/lib/answerCorrectness";

import {TextBasedQuestion} from "@/types/TextBasedQuestion";

export const textBasedTag = 'Text-based Question';

export const textBasedPrePrompt = `Text-based questions must be in the following format:
    ${textBasedTag}: <question>?\n
`;

export const parseTextBased = (message: Message): TextBasedQuestion => ({
    id: message.id,
    question: message.content.split('Question: ')[1]
})

export const textBasedAnswerPrompt = (answer: string) => `
    The user has answered ${answer}.
    
    Please respond by saying whether or not they are correct and explain why. Speak in the second person.
    
    Use the following format:
    
    ${answerCheckTag}: <${correctTag}/${incorrectTag}>, <reason>
`