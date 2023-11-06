import {PromptTags, ResponseTags} from "@/prompts/tags";

import {Prompt, PromptTypes} from "@/types/prompts/Prompt";
import {AnswerCorrectness} from "@/types/prompts/AnswerCorrectness";

export const correctTag = 'Correct';
export const incorrectTag = 'Incorrect';
export const explanationTag = 'Explanation';

export const answerCorrectnessResponseTag = 'Answer Correctness';
const answerCorrectnessResponseDescription = 'Please respond by saying whether they are correct and explain why. Speak in the second person and only use the notes the user has provided.';
const answerCorrectnessResponseFormatting = `<${correctTag}/${incorrectTag}>, ${explanationTag}: <reason>`;
export enum Correctness {
    Correct,
    Incorrect,
    Unknown
}

export const answerCorrectnessPrompt = (answer: string): Prompt<AnswerCorrectness> => ({
    ...answerCorrectnessDefaults,
    promptContent: answer,
});

export const answerCorrectnessDefaults: Prompt<AnswerCorrectness> = {
    responseTag: ResponseTags.ANSWER_CORRECTNESS,
    responseDescription: answerCorrectnessResponseDescription,
    responseFormatting: answerCorrectnessResponseFormatting,
    promptTag: PromptTags.ANSWER_CORRECTNESS,
    promptType: PromptTypes.REGULAR,
    promptContent: '',
    parseResponse: (content: string, id: string): AnswerCorrectness => {
        let correct = Correctness.Unknown;
        let explanation = '';
        if(content) {
            const temp = content.split(`, ${explanationTag}: `);
            correct = temp[0] === correctTag ? Correctness.Correct : temp[0] === incorrectTag ? Correctness.Incorrect : Correctness.Unknown;
            explanation = temp[1];
        }
        return {
            id,
            correct,
            explanation
        }
    }
}