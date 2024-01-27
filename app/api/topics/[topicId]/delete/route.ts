import {TopicIdParams} from "@/app/api/topics/[topicId]/TopicIdParams";
import {deleteTopic} from "@/cosmosPostgres/services/topic";

export const DELETE = async (req: Request, {params}: {params: TopicIdParams}) => {
    const deleteSuccess = await deleteTopic(params.topicId);
    return Response.json(deleteSuccess)
}