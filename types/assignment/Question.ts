export enum QuestionTypes {
    MultipleChoice = "MultipleChoice",
    FreeResponse = "FreeResponse"
}

export interface Question<QuestionType> {
    tag: QuestionTypes;
    question: QuestionType;
}

export type QuestionMap = {
    [key: number]: Question<any>
}