import {Prompt, PromptTypes} from "@/prompts/Prompt";

import {AnswerCorrectness} from "@/types/prompts/AnswerCorrectness";
import {correctTag, explanationTag, incorrectTag} from "@/prompts/answerCorrectness";

export const answerCorrectnessResponseTag = 'Answer Correctness';
const answerCorrectnessResponseDescription = 'Please respond by saying whether they are correct and explain why. Speak in the second person and only use the notes the user has provided.';
const answerCorrectnessResponseFormatting = `<${correctTag}/${incorrectTag}>, ${explanationTag}: <reason>`;

export const answerCorrectnessPromptTag = 'Answer Correctness Prompt';

export enum Correctness {
    Correct,
    Incorrect,
    Unknown
}

export class AnswerCorrectnessPrompt extends Prompt<AnswerCorrectness> {

    constructor(answer: string) {
        super(
            answerCorrectnessResponseTag,
            answerCorrectnessResponseDescription,
            answerCorrectnessResponseFormatting,
            answerCorrectnessPromptTag,
            answer,
            PromptTypes.REGULAR
        );
    }

    parseResponse(content: string, id: string): AnswerCorrectness {
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