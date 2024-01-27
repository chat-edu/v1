import {TopicRow} from "@/cosmosPostgres/types/topic";
import {Topic} from "@/types/Topic";

export const transformTopic = (row: TopicRow): Topic => ({
    id: row.id,
    notebookId: row.notebook_id,
    name: row.name,
    orderPosition: row.order_position,
    parentTopicId: row.parent_topic_id,
});