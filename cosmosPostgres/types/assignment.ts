import {TopicRow} from "@/cosmosPostgres/types/topic";
import {FreeResponseQuestionRow, MultipleChoiceQuestionRow} from "@/cosmosPostgres/types/question";

export interface AssignmentRowInput {
    name: string;
    topic_id: TopicRow["id"];
}

export interface AssignmentRow extends AssignmentRowInput {
    id: number;
}

export interface AssignmentRowWithQuestions extends AssignmentRow {
    multiple_choice_questions: MultipleChoiceQuestionRow[];
    free_response_questions: FreeResponseQuestionRow[];
}