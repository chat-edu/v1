import {findUserTopicNodesByNotebookId} from "@/cosmosPostgres/services/knowledgeGraph";

import {UserIdParams} from "@/app/api/topicNodes/[notebookId]/user/[userId]/UserIdParams";

export const GET = async (req: Request, {params}: {params: UserIdParams}) => {
    return Response.json(await findUserTopicNodesByNotebookId(params.userId, params.notebookId));
}