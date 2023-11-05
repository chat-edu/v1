import {PromptResponse} from "@/types/prompts/PromptResponse";

export enum Correctness {
    Correct,
    Incorrect,
    Unknown
}

export interface AnswerCorrectness extends PromptResponse {
    correct: Correctness;
    explanation: string;
}