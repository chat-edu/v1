import {Message} from "ai";

export const answerCheckTag = 'Question Correctness';

export const correctTag = 'Correct';

export const incorrectTag = 'Incorrect';

export const parseAnswerCorrectness = (message: Message): string => {
    return message.content.split('Question Correctness: ')[1]
}