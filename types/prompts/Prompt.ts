import {PromptTags, ResponseTags} from "@/prompts/tags";

export enum PromptTypes {
    REGULAR,
    MULTIPLE_CHOICE,
    TEXT_BASED,
    STUDY_GUIDE,
    HINT,
}

export interface Prompt {
    responseTag: ResponseTags;
    responseDescription: string;
    responseFormatting: string;
    promptTag: PromptTags;
    promptContent: string;
    promptType: PromptTypes;
}