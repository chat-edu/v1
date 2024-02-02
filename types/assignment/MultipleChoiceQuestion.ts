import {Assignment} from "@/types/assignment/Assignment";

import { MultipleChoiceQuestion as MultipleChoiceQuestionCommand } from '@/types/commands/MultipleChoiceQuestion';

export interface MultipleChoiceQuestionInput extends MultipleChoiceQuestionCommand {
    assignmentId: Assignment["id"],
    questionNumber: number,
}

export interface MultipleChoiceQuestion extends MultipleChoiceQuestionInput {
    id: number;
    assignmentId: Assignment["id"]
}