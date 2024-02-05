import {NotebookIdParams} from "@/app/api/summaries/notebook/[notebookId]/NotebookIdParams";
import {getNotebookSummary} from "@/cosmosPostgres/services/summaries/notebookSummaries";

export const GET = async (req: Request, { params }: {params: NotebookIdParams}) => {
    return Response.json(await getNotebookSummary(params.notebookId))
}