import {PromptResponse} from "@/types/prompts/PromptResponse";

export interface Hint extends PromptResponse {
    hint: string;
}