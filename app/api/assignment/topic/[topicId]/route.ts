import {findAssignmentsByTopicId} from "@/cosmosPostgres/services/assignments";

import {TopicIdParams} from "@/app/api/assignment/topic/[topicId]/TopicIdParams";

export const GET = async (req: Request, {params}: {params: TopicIdParams}) => {
    return Response.json(await findAssignmentsByTopicId(params.topicId));
}