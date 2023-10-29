import {Message} from "ai";

import {correctTag, incorrectTag, answerCheckTag} from "@/lib/answerCorrectness";

import {TextBasedQuestion} from "@/types/TextBasedQuestion";

export const textBasedPromptTag = 'Text-based Prompt';
export const textBasedQuestionTag = 'Text-based Question';

export const textBasedPrePrompt = `Text-based questions must be in the following format:
    ${textBasedQuestionTag}: <question>?\n
`;

export const textBasedPrompt = `${textBasedPromptTag}: Please ask me a text-based question`;

export const parseTextBased = (message: Message): TextBasedQuestion => ({
    id: message.id,
    question: message.content.split('Question: ')[1]
})

export const textBasedAnswerPrompt = `    
    Please respond to the user in the second person saying whether or not they are correct and why.
    
    Use the following format:
    
    ${answerCheckTag}: <${correctTag}/${incorrectTag}>, <reason>
`