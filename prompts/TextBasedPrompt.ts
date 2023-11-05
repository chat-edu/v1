import {Prompt, PromptTypes} from "@/prompts/Prompt";

import {TextBasedQuestion} from "@/types/prompts/TextBasedQuestion";

export const textBasedResponseTag = 'Text-based Response';
export const textBasedResponseDescription = 'Text-based responses should ask the user to apply their knowledge to a problem. Do not simply ask the user to regurgitate the definition of a term.';
export const textBasedResponseFormatting = '<question>?';

export const textBasedPromptTag = `Text-based Prompt`;
export const textBasedPromptContent = `Please ask me a text-based question`;

export class TextBasedPrompt extends Prompt<TextBasedQuestion> {
    constructor() {
        super(
            textBasedResponseTag,
            textBasedResponseDescription,
            textBasedResponseFormatting,
            textBasedPromptTag,
            textBasedPromptContent,
            PromptTypes.TEXT_BASED
        );
    }

    parseResponse(content: string, id: string): TextBasedQuestion {
        return {
            id: id,
            question: content
        }
    }
}