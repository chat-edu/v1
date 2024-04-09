import {TopicEdgeRow} from "@/cosmosPostgres/types/topicEdge";
import {TopicEdge} from "@/types/KnowledgeGraph";

export const transformTopicEdge = (topicEdge: TopicEdgeRow): TopicEdge => ({
    sourceTopicId: topicEdge.source_topic_id,
    targetTopicId: topicEdge.target_topic_id,
})