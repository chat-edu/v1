import {Prompt, PromptTypes} from "@/types/prompts/Prompt";
import {TextBasedQuestion} from "@/types/prompts/TextBasedQuestion";
import {PromptTags, ResponseTags} from "@/prompts/tags";

export const textBasedResponseDescription = 'Text-based responses should ask the user to apply their knowledge to a problem. Do not simply ask the user to regurgitate the definition of a term.';
export const textBasedResponseFormatting = '<question>?';
export const textBasedPromptContent = `Please ask me a text-based question`;

export const textBasedPrompt: Prompt = {
    responseTag: ResponseTags.TEXT_BASED,
    responseDescription: textBasedResponseDescription,
    responseFormatting: textBasedResponseFormatting,
    promptTag: PromptTags.TEXT_BASED,
    promptContent: textBasedPromptContent,
    promptType: PromptTypes.TEXT_BASED
}

export const parseTextBasedContent = (content: string, id: string): TextBasedQuestion => {
    return {
        id,
        question: content
    }
}