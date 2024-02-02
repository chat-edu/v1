export enum QuestionTypes {
    MultipleChoice = "MultipleChoice",
    FreeResponse = "FreeResponse"
}

export interface Question<QuestionType> {
    tag: QuestionTypes;
    question: QuestionType;
}