import {Message} from "ai";
import {PromptResponse} from "@/types/prompts/PromptResponse";

export enum PromptTypes {
    REGULAR,
    MULTIPLE_CHOICE,
    TEXT_BASED,
    STUDY_GUIDE,
    HINT,
}

export abstract class Prompt<ResponseType extends PromptResponse> {
    responseTag: string;
    responseDescription: string;
    responseFormatting: string;
    promptTag: string;
    promptContent: string;
    promptType: PromptTypes;

    protected constructor(
        responseTag: string,
        responseDescription: string,
        responseFormatting: string,
        promptTag: string,
        promptContent: string,
        promptType: PromptTypes
    ) {
        this.responseTag = responseTag;
        this.responseDescription = responseDescription;
        this.responseFormatting = responseFormatting;
        this.promptTag = promptTag;
        this.promptContent = promptContent;
        this.promptType = promptType;
    }

    // get the pre-prompt message used as system context for a prompt
    getPrePrompt(): string {
        return `
            Content: ${this.responseDescription}
    
            Formatting: responses MUST be in EXACTLY the following format:
            
            ${this.responseTag}: <${this.responseFormatting}>\n
        `
    };

    // gets the user prompt message
    getPrompt(): string {
        return `${this.promptTag}: ${this.promptContent}`;
    }

    getPromptType(): PromptTypes {
        return this.promptType;
    }

    parseMessage(message: Message): ResponseType {
        return this.parseResponse(message.content.split(`${this.responseTag}: `)[1], message.id);
    }

    // parses the user response into a response object
    abstract parseResponse(content: string, id: string): ResponseType;
}