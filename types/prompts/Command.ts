import {PromptTags, ResponseTags} from "@/prompts/tags";
import {PromptResponse} from "@/types/prompts/PromptResponse";

export enum PromptTypes {
    REGULAR,
    MULTIPLE_CHOICE,
    TEXT_BASED,
    STUDY_GUIDE,
    HINT,
}

export interface Command<ResponseType extends PromptResponse> {
    responseTag: ResponseTags;
    responseDescription: string;
    responseFormatting: string;
    promptTag: PromptTags;
    promptContent: string;
    promptType: PromptTypes;
    parseResponse: (content: string, id: string) => ResponseType
}