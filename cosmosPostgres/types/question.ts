import {AssignmentRow} from "@/cosmosPostgres/types/assignment";

export interface QuestionRowInput {
    assignment_id: AssignmentRow["id"];
    question: string;
    question_number: number;
}

export interface FreeResponseQuestionRow extends QuestionRowInput {
    id: number;
}

export interface MultipleChoiceQuestionRowInput extends QuestionRowInput {
    option_a: string;
    option_b: string;
    option_c: string;
    option_d: string;
    answer: "A" | "B" | "C" | "D";
}

export interface MultipleChoiceQuestionRow extends MultipleChoiceQuestionRowInput  {
    id: number;
}

export interface Question<QuestionType> {
    tag: string;
    question: QuestionType;
}