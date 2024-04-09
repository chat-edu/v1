import {TopicRow} from "@/cosmosPostgres/types/topic";

export interface TopicEdgeRow {
    source_topic_id: TopicRow["id"];
    target_topic_id: TopicRow["id"];
}