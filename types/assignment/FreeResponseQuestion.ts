import {TextBasedQuestion} from "@/types/commands/TextBasedQuestion";
import {Assignment} from "@/types/assignment/Assignment";

export interface FreeResponseQuestionInput extends TextBasedQuestion {
    assignmentId: Assignment["id"],
    questionNumber: number,
}

export interface FreeResponseQuestion extends FreeResponseQuestionInput {
    id: number;
}