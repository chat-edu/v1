import {Message} from "ai";

import {correctTag, incorrectTag, answerCheckTag} from "@/lib/answerCorrectness";

import {MultipleChoiceQuestion} from "@/types/MultipleChoiceQuestion";

export const multipleChoicePromptTag = 'Multiple Choice Prompt';
export const multipleChoiceQuestionTag = 'Multiple Choice Question';
export const multipleChoicePrePrompt = `Multiple choice questions must be in the following format:
    ${multipleChoiceQuestionTag}: <question>?\n
    A) <answer 1>\n
    B) <answer 2>\n
    C) <answer 3>\n
    D) <answer 4>\n
    Answer: <letter of correct answer>`

export const multipleChoicePrompt = `${multipleChoicePromptTag}: Please ask me a multiple choice question`;

export const parseMultipleChoice = (message: Message): MultipleChoiceQuestion => {
    const splitMessage = message.content.split('Question: ')[1].split('?');
    const lines = message.content.split('\n');
    return {
        id: message.id,
        question: splitMessage[0] + '?',
        options: lines.slice(1, lines.length - 1).filter((option) => option !== '' && option !== ' '),
        answerIndex: letterToIndex(message.content.split('Answer: ')[1].substring(0, 1))
    }
}

const letterToIndex = (letter: string): number => {
    switch (letter) {
        case 'A':
            return 0;
        case 'B':
            return 1;
        case 'C':
            return 2;
        case 'D':
            return 3;
        default:
            return -1;
    }
}

export const multipleChoiceAnswerPrePrompt = `
    
    Please respond by saying whether they are correct and explain why. Speak in the second person and only use the notes the user has provided.
    
    Use the following format:
    
    ${answerCheckTag}: <${correctTag}/${incorrectTag}>, <reason>
    
`