import {PromptTags, ResponseTags} from "@/prompts/tags";

import {Prompt, PromptTypes} from "@/types/prompts/Prompt";
import {Hint} from "@/types/prompts/Hint";

const hintResponseDescription = 'Hints should be helpful but should not give away the answer. Do NOT too much information as the user should still be able to solve the problem on their own.';
const hintResponseFormat = '<content>';

const hintPromptContent = 'Please provide a hint for the user.';

export const hintPrompt: Prompt = {
    responseTag: ResponseTags.HINT,
    responseDescription: hintResponseDescription,
    responseFormatting: hintResponseFormat,
    promptTag: PromptTags.HINT,
    promptContent: hintPromptContent,
    promptType: PromptTypes.HINT
}

export const parseHintContent = (content: string, id: string): Hint => {
    return {
        id,
        hint: content
    }
}