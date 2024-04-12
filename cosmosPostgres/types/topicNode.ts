import {TopicRow, UserRow} from "@/cosmosPostgres/types";
import {TopicCompletionRow} from "@/cosmosPostgres/types/topicCompletion";

export interface TopicNodeRow {
    topic_id: TopicRow["id"];
    x: number;
    y: number;
}

export interface TopicNodeWithNameAndCompletionRow extends TopicNodeRow {
    completion_percentage: TopicCompletionRow["completion_percentage"];
    name: TopicRow["name"];
}

export interface UserTopicNodeWithNameAndCompletionRow extends TopicNodeWithNameAndCompletionRow {
    user_id: UserRow["id"];
}