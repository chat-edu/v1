import {Prompt} from "@/types/prompts/Prompt";
import {PromptResponse} from "@/types/prompts/PromptResponse";
import {Message} from "ai";

export const getPrePrompt = (prompt: Prompt<any>): string => {
    return `
        Content: ${prompt.responseDescription}

        Formatting: responses MUST be in EXACTLY the following format:
        
        ${prompt.responseTag}: <${prompt.responseFormatting}>\n
    `
};

export const getPrompt = (prompt: Prompt<any>): string => {
    return `${prompt.promptTag}: ${prompt.promptContent}`;
}

export const parseResponse = <ResponseType extends PromptResponse>(
    prompt: Prompt<ResponseType>,
    message: Message,
): ResponseType => prompt.parseResponse(message.content.split(`${prompt.responseTag}: `)[1], message.id);