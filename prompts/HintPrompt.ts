import {Prompt, PromptTypes} from "@/prompts/Prompt";

import {Hint} from "@/types/prompts/Hint";

export const hintResponseTag = 'Hint Response';
const hintResponseDescription = 'Hints should be helpful but should not give away the answer. Do NOT too much information as the user should still be able to solve the problem on their own.';
const hintResponseFormat = '<content>';

export const hintPromptTag = 'Hint Prompt';
const hintPrompt = 'Please provide a hint for the user.';

export class HintPrompt extends Prompt<Hint> {
    constructor() {
        super(
            hintResponseTag,
            hintResponseDescription,
            hintResponseFormat,
            hintPromptTag,
            hintPrompt,
            PromptTypes.HINT
        );
    }

    parseResponse(content: string, id: string): Hint {
        return {
            id,
            hint: content
        }
    }
}