import {Message} from "ai";

import {TextBasedQuestion} from "@/types/TextBasedQuestion";

export const textBasedTag = 'Text-based Question';

export const textBasedPrePrompt = `Text-based questions must be in the following format:
    ${textBasedTag}: <question>?\n
`;

export const parseTextBased = (message: Message): TextBasedQuestion => ({
    id: message.id,
    question: message.content.split('Question: ')[1]
})