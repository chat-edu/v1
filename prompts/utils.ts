import {Command} from "@/types/prompts/Command";
import {PromptResponse} from "@/types/prompts/PromptResponse";
import {Message} from "ai";

export const getPrePrompt = (prompt: Command<any>): string => `
    Content: ${prompt.responseDescription}
    
    Format: prompts should be in markdown, using headings, bold, italics, and lists, and math expressions where appropriate.

    Template: Responses MUST use the following template EXACTLY . <> indicates a placeholder. Do NOT include the <> in your response, but ensure that the placeholder's description is satisfied. Make sure to start with ${prompt.responseTag} followed by a colon (:).
    
    ${prompt.responseTag}: <${prompt.responseFormatting}>
`;

export const getPrompt = (prompt: Command<any>): string => {
    return `${prompt.promptTag}: ${prompt.promptContent}`;
}

export const parseResponse = <ResponseType extends PromptResponse>(
    prompt: Command<ResponseType>,
    message: Message,
): ResponseType => prompt.parseResponse(message.content.split(`${prompt.responseTag}: `)[1], message.id);