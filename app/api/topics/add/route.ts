import {addTopic} from "@/cosmosPostgres/services/topic";

export const POST = async (request: Request) => {
    const topic = (await request.json());

    if (!topic) return Response.json(false);
    if (!topic.name) return Response.json(false);
    if (!topic.notebook_id) return Response.json(false);

    const topicRow = await addTopic({
        name: topic.name,
        order_position: topic.order_position,
        notebook_id: topic.notebook_id,
        parent_topic_id: topic.parent_topic_id || null,
    });

    return Response.json(topicRow);
}