import {UserIdParams} from "@/app/api/topicNodes/[notebookId]/user/[userId]/UserIdParams";
import {updateUserTopicCompletion} from "@/cosmosPostgres/services/knowledgeGraph";

export const PATCH = async (req: Request, {params}: {params: UserIdParams}) => {
    let body = await req.json();
    if(!body.completion_percentage) {
        return Response.json({error: 'completion_percentage is required'}, {status: 400});
    }
    return Response.json(updateUserTopicCompletion(params.userId, params.notebookId, body.completion_percentage))
}