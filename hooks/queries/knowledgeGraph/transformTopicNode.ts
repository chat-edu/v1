import {
    TopicNodeWithNameAndCompletionRow,
    UserTopicNodeWithNameAndCompletionRow
} from "@/cosmosPostgres/types/topicNode";
import {TopicNode} from "@/types/KnowledgeGraph";

export const transformTopicNode = (topicNodeRow: TopicNodeWithNameAndCompletionRow): TopicNode => ({
    id: topicNodeRow.topic_id,
    name: topicNodeRow.name,
    x: topicNodeRow.x,
    y: topicNodeRow.y,
    completionPercentage: topicNodeRow.completion_percentage,
});

export const transformUserTopicNode = (topicNodeRow: UserTopicNodeWithNameAndCompletionRow) => ({
    ...transformTopicNode(topicNodeRow),
    userId: topicNodeRow.user_id,
});