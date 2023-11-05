import {PromptResponse} from "@/types/prompts/PromptResponse";

export interface TextBasedQuestion extends PromptResponse {
    question: string;
}