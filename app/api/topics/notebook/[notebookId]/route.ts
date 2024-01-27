import {NotebookIdParams} from "@/app/api/topics/notebook/[notebookId]/NotebookIdParams";
import {findTopicsByNotebookId} from "@/cosmosPostgres/services/topic";

export const GET = async (request: Request, {params}: {params: NotebookIdParams}) => {
    return Response.json(await findTopicsByNotebookId(params.notebookId));
}