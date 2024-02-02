import {MultipleChoiceQuestion} from "@/types/commands/MultipleChoiceQuestion";
import {TextBasedQuestion} from "@/types/commands/TextBasedQuestion";
import {Question} from "@/types/assignment/Question";

export interface GeneratedAssignment {
    name: string;
    questions: (Question<MultipleChoiceQuestion | TextBasedQuestion>)[];
}