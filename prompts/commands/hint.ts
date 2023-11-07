import {PromptTags, ResponseTags} from "@/prompts/tags";

import {Command, PromptTypes} from "@/types/prompts/Command";
import {Hint} from "@/types/prompts/Hint";

const hintResponseDescription = 'Hints should be helpful but should not give away the answer. Do NOT too much information as the user should still be able to solve the problem on their own.';
const hintResponseFormat = '<content>';
const hintPromptContent = 'Please provide a hint for the user.';

export const hintCommand: Command<Hint> = {
    responseTag: ResponseTags.HINT,
    responseDescription: hintResponseDescription,
    responseFormatting: hintResponseFormat,
    promptTag: PromptTags.HINT,
    promptContent: hintPromptContent,
    promptType: PromptTypes.HINT,
    parseResponse: (content: string, id: string): Hint => {
        return {
            id,
            hint: content
        }
    }
}