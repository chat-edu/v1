import {MultipleChoiceQuestion} from "@/types/assignment/MultipleChoiceQuestion";
import {FreeResponseQuestion} from "@/types/assignment/FreeResponseQuestion";

import {Topic} from "@/types/Topic";
import {Question} from "@/types/assignment/Question";

export interface AssignmentInput {
    name: string;
    topicId: Topic["id"];
}

export interface Assignment extends AssignmentInput {
    id: number;
}

export interface AssignmentWithQuestions extends Assignment {
    questions: Question<MultipleChoiceQuestion | FreeResponseQuestion>[]
}