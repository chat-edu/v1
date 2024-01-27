import {TopicRow} from "@/cosmosPostgres/types/topic";
import {updateTopic} from "@/cosmosPostgres/services/topic";

import {TopicIdParams} from "@/app/api/topics/[topicId]/TopicIdParams";

export const PATCH = async (request: Request, {params}: {params: TopicIdParams}) => {
    const body = await request.json();

    const topic: Partial<TopicRow> = {}
    if(body.name) topic.name = body.name;
    if(body.order_position) topic.order_position = body.order_position;

    const topicRow = await updateTopic(params.topicId, topic);

    return Response.json(topicRow);
}