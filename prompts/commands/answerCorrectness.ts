import {PromptTags, ResponseTags} from "@/prompts/tags";

import {Command, PromptTypes} from "@/types/prompts/Command";
import {AnswerCorrectness} from "@/types/prompts/AnswerCorrectness";

export const correctTag = 'Correct';

export const incorrectTag = 'Incorrect';
export const explanationTag = 'Explanation';

export const answerCorrectnessResponseTag = 'Answer Correctness';
const answerCorrectnessResponseDescription = `Please respond by saying whether the user has answered are correct and explain why. Speak in the second person. Provide an explanation of the correct answer if the user\'s answer is incorrect. The question asked is as follows: `;
const answerCorrectnessResponseFormatting = `<${correctTag}/${incorrectTag}> ${explanationTag}: <explanation>`;
export enum Correctness {
    Correct,
    Incorrect,
    Unknown
}

export const answerCorrectnessCommand = (question: string, answer: string): Command<AnswerCorrectness> => ({
    ...answerCorrectnessDefaults,
    responseDescription: answerCorrectnessResponseDescription + question,
    promptContent: answer,
});

export const answerCorrectnessDefaults: Command<AnswerCorrectness> = {
    responseTag: ResponseTags.ANSWER_CORRECTNESS,
    responseDescription: answerCorrectnessResponseDescription,
    responseFormatting: answerCorrectnessResponseFormatting,
    promptTag: PromptTags.ANSWER_CORRECTNESS,
    promptType: PromptTypes.REGULAR,
    promptContent: '',
    parseResponse: (content: string, id: string) => {
        let correct = Correctness.Unknown;
        let explanation = '';
        if(content) {
            content = content.replace(/\n/g, ' ');
            const [correctnessRaw, body] = content.split(`${explanationTag}: `);
            const correctness = correctnessRaw.trim().replace(/[^a-zA-Z0-9]/g, '');
            correct = correctness === correctTag ? Correctness.Correct : correctness === incorrectTag ? Correctness.Incorrect : Correctness.Unknown;
            explanation = body ? body.trim() : '';
        }
        return {
            id,
            correct,
            explanation
        }
    }
}