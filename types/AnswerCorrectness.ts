export enum Correctness {
    Correct,
    Incorrect,
    Unknown
}

export interface AnswerCorrectness {
    correct: Correctness;
    explanation: string;
}