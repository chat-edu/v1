import {TopicRow} from "@/cosmosPostgres/types/topic";
import {UserRow} from "@/cosmosPostgres/types/user";

export interface TopicCompletionRow {
    topic_id: TopicRow["id"];
    user_id: UserRow["id"];
    completion_percentage: number;
}