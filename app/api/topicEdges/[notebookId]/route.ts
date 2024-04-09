import {findTopicEdgesByNotebookId} from "@/cosmosPostgres/services/knowledgeGraph";

import {NotebookIdParams} from "@/app/api/topicEdges/[notebookId]/NotebookIdParams";

export const GET = async (req: Request, { params }: { params: NotebookIdParams }) => {
    return Response.json(await findTopicEdgesByNotebookId(params.notebookId));
}