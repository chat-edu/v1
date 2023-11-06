import {Prompt} from "@/types/prompts/Prompt";

export const getPrePrompt = (prompt: Prompt): string => {
    return `
        Content: ${prompt.responseDescription}

        Formatting: responses MUST be in EXACTLY the following format:
        
        ${prompt.responseTag}: <${prompt.responseFormatting}>\n
    `
};

export const getPrompt = (prompt: Prompt): string => {
    return `${prompt.promptTag}: ${prompt.promptContent}`;
}