import {Command} from "@/types/prompts/Command";
import {PromptResponse} from "@/types/prompts/PromptResponse";
import {Message} from "ai";

export const getPrePrompt = (prompt: Command<any>): string => {
    return `
        Content: ${prompt.responseDescription}

        Formatting: Responses MUST be in EXACTLY the following format. <> indicates a placeholder. Do NOT include the <> in your response, but ensure that the placeholder is EXACTLY satisfied.
        
        ${prompt.responseTag}: <${prompt.responseFormatting}>
    `
};

export const getPrompt = (prompt: Command<any>): string => {
    return `${prompt.promptTag}: ${prompt.promptContent}`;
}

export const parseResponse = <ResponseType extends PromptResponse>(
    prompt: Command<ResponseType>,
    message: Message,
): ResponseType => prompt.parseResponse(message.content.split(`${prompt.responseTag}: `)[1], message.id);