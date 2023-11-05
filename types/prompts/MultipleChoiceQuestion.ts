import {PromptResponse} from "@/types/prompts/PromptResponse";

export interface MultipleChoiceQuestion extends PromptResponse {
    question: string;
    options: string[];
    answerIndex: number;
}